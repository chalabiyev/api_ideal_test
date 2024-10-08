package az.esam.kredit.kredit.services.internal.otp;

import az.esam.kredit.kredit.dtos.requests.ChangeEmailRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePasswordRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePhoneRequest;
import az.esam.kredit.kredit.dtos.requests.OTPRequest;
import az.esam.kredit.kredit.dtos.requests.PasswordResetRequest;
import az.esam.kredit.kredit.services.external.email.EmailService;
import az.esam.kredit.kredit.entities.OTPRecord;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.repositories.OTPRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.external.sms.SMSService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class OTPServiceImpl implements OTPService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    OTPRepository otpRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    SMSService smsService;

    @Override
    public boolean sendOtp(OTPRequest request, boolean isPhone) {
        try {
            if (request.getContact() == null) {
                throw new RuntimeException("Contact is required");
            }

            String otpCode = createOtpCode();

            OTPRecord otpRecord = new OTPRecord();
            otpRecord.setOtpCode(passwordEncoder.encode(otpCode));
            otpRecord.setClientUUID(request.getClientUUID());
            otpRecord.setIpAddress(request.getIpAddress());
            otpRecord.setSendDate(new Date());

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.MINUTE, 3);
            otpRecord.setExpirationDate(calendar.getTime());

            if (isPhone) {
                otpRecord.setPhone(request.getContact());
                if (smsService.getSMSBalance() <= 0) {
                    throw new RuntimeException("SMS balance is empty");
                }
                if (!request.getContact().substring(0, 3).equals("994")) {
                    request.setContact("994" + request.getContact());
                }

                request.setContact(request.getContact()
                        .replace("(", "")
                        .replace(")", "")
                        .replace(" ", "")
                        .replace("-", "")
                        .replace("+", ""));
                boolean result = smsService.sendSMS(request.getContact(), otpCode);
                if (result) {
                    otpRepository.insert(otpRecord);
                }
                return result;
            } else {
                otpRecord.setEmail(request.getContact());

                if (emailService.sendEmail(from, request.getContact(), "OTP Code", otpCode)) {
                    otpRepository.insert(otpRecord);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public boolean validateOTP(String contact, String otpCode, boolean isPhone) {
        try {
            List<OTPRecord> otpRecord = isPhone ?
                    otpRepository.findByPhone(contact) :
                    otpRepository.findByEmail(contact);

            if (otpRecord.isEmpty()) {
                throw new RuntimeException("OTP record not found");
            }

            if (otpRecord.get(otpRecord.size() - 1).getExpirationDate().before(new Date())
                    || otpRecord.get(otpRecord.size() - 1).getValidationDate() != null) {
                throw new RuntimeException("OTP code is expired");
            }

            boolean result = passwordEncoder.matches(otpCode, otpRecord.get(otpRecord.size() - 1).getOtpCode());
            if (result) {
                otpRecord.get(0).setValidationDate(new Date());
                otpRepository.save(otpRecord.get(0));
            }
            return result;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean resetPassword(PasswordResetRequest request, HttpServletRequest httpRequest, boolean isPhone) {
        if (isPhone) {
            request.setContact(request.getContact()
                    .replace("(", "")
                    .replace(")", "")
                    .replace(" ", "")
                    .replace("-", "")
                    .replace("+", "")
            );
            if (!request.getContact().startsWith("994")) {
                request.setContact("994" + request.getContact());
            }
        }
        try {
            User user = isPhone ?
                    userRepository.findByPhoneNumber(request.getContact())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found")) :
                    userRepository.findByEmail(request.getContact())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (request.getNewPassword().equals(request.getPassword())) {
                if (validateOTP(request.getContact(), request.getOtpCode(), isPhone)) {
                    user.setPassword(passwordEncoder.encode(request.getPassword()));
                    userRepository.save(user);
                    return true;
                }
            } else {
                throw new RuntimeException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest, Authentication authentication) {
        try {
            var user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())
                    && request.getNewPassword().equals(request.getPassword())) {

                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepository.save(user);
                return true;
            } else {
                throw new RuntimeException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean changeEmail(ChangeEmailRequest request, HttpServletRequest httpRequest) {
        try {
            User userExists = userRepository.findByEmail(request.getNewEmail()).orElse(null);

            if (userExists != null) {
                throw new RuntimeException("Email already exists");
            }

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (validateOTP(request.getNewEmail(), request.getOtpCode(), false)) {
                if (request.getEmail().equals(user.getEmail())) {
                    user.setEmail(request.getNewEmail());
                    userRepository.save(user);
                    return true;
                } else {
                    throw new RuntimeException("Emails do not match");
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean changePhone(ChangePhoneRequest request, HttpServletRequest httpRequest) {
        try {
            User userExists = userRepository.findByPhoneNumber(request.getNewPhone()).orElse(null);

            if (userExists != null) {
                throw new RuntimeException("Phone number already exists");
            }

            User user = userRepository.findByPhoneNumber(request.getPhone())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (validateOTP(request.getNewPhone(), request.getOtpCode(), true)) {
                if (request.getPhone().equals(user.getPhoneNumber())) {
                    user.setPhoneNumber(request.getNewPhone());
                    userRepository.save(user);
                    return true;
                } else {
                    throw new RuntimeException("Emails do not match");
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
        return false;
    }

    private String createOtpCode() {
        Random random = new Random();
        int fourDigit = 1000 + random.nextInt(9000);
        return String.valueOf(fourDigit);
    }
}
