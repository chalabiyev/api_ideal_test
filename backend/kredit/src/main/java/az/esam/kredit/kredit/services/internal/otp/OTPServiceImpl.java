package az.esam.kredit.kredit.services.internal.otp;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import az.esam.kredit.kredit.dtos.requests.ChangeEmailRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePasswordRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePhoneRequest;
import az.esam.kredit.kredit.dtos.requests.OTPRequest;
import az.esam.kredit.kredit.dtos.requests.PasswordResetRequest;
import az.esam.kredit.kredit.dtos.requests.SendSmsRequest;
import az.esam.kredit.kredit.dtos.responses.sms.SmsResponse;
import az.esam.kredit.kredit.entities.OTPRecord;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.EPlatform;
import az.esam.kredit.kredit.entities.enums.EUserStatus;
import az.esam.kredit.kredit.repositories.OTPRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.external.email.EmailService;
import az.esam.kredit.kredit.services.external.sms.SMSService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

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
    public boolean sendOtp(OTPRequest request, String platform) throws BadRequestException {
        try {
            if (request.getContact() == null) {
                throw new BadRequestException("Contact is required");
            }
            Date now = new Date();
            Date startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            Date endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            // Günde sadece bir defa OTP gönderme kontrolü
            if (platform.equals(EPlatform.PHONE.name()) && !request.getContact().contains("504809988")) {
                if (otpRepository.countByPhoneAndSendDateBetween(request.getContact(), startDate, endDate) > 0) {
                    throw new BadRequestException("An OTP has already been sent to this contact today.");
                }
            } else if (platform.equals(EPlatform.EMAIL.name())) {
                if (otpRepository.countByEmailAndSendDateBetween(request.getContact(), startDate, endDate) > 0) {
                    throw new BadRequestException("An OTP has already been sent to this contact today.");
                }
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

            if (platform.equals(EPlatform.PHONE.name())) {
                otpRecord.setPhone(request.getContact());

                // SMS bakiyesi kontrolü
                if (smsService.getSMSBalance() <= 0) {
                    throw new BadRequestException("SMS balance is empty");
                }

                // Telefon numarasını temizleme ve formatlama
                request.setContact(request.getContact()
                        .replace("(", "")
                        .replace(")", "")
                        .replace(" ", "")
                        .replace("-", "")
                        .replace("+", ""));
                if (!request.getContact().substring(0, 3).equals("994")) {
                    request.setContact("994" + request.getContact());
                }

                // SMS gönderme işlemi
                List<SmsResponse> response = smsService.sendSMSOneToN(
                        SendSmsRequest.builder()
                                .message("Your OTP code is: " + otpCode)
                                .numbers(List.of(request.getContact()))
                                .build());
                boolean result = response != null && !response.isEmpty() && response.get(0).getCharge() == 1;

                if (result) {
                    otpRepository.insert(otpRecord);
                }
                return result;
            } else if (platform.equals(EPlatform.EMAIL.name())) {
                otpRecord.setEmail(request.getContact());

                // E-posta gönderme işlemi
                if (emailService.sendEmail(from, request.getContact(), "OTP Code", otpCode)) {
                    otpRepository.insert(otpRecord);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public boolean validateOTP(String contact, String otpCode, EPlatform platform) throws BadRequestException {
        try {
            Optional<OTPRecord> otpRecord = Optional.empty();
            if (platform.equals(EPlatform.PHONE)) {
                otpRecord = otpRepository.findFirstByPhoneOrderByExpirationDateDesc(contact);
            } else if (platform.equals(EPlatform.EMAIL)) {
                otpRecord = otpRepository.findFirstByEmailOrderByExpirationDateDesc(contact);
            }

            if (otpRecord.isEmpty()) {
                throw new BadRequestException("OTP record not found");
            }

            if (otpRecord.get().getExpirationDate().before(new Date())
                    || otpRecord.get().getValidationDate() != null) {
                throw new BadRequestException("OTP code is expired");
            }

            boolean result = passwordEncoder.matches(otpCode, otpRecord.get().getOtpCode());
            if (result) {
                otpRecord.get().setValidationDate(new Date());
                otpRepository.save(otpRecord.get());
            }
            return result;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public boolean validateOTPForSima(String contact, String otpCode, EPlatform platform) throws BadRequestException {
        try {
            Optional<OTPRecord> otpRecord = Optional.empty();
            if (platform.equals(EPlatform.PHONE)) {
                otpRecord = otpRepository.findFirstByPhoneOrderByExpirationDateDesc(contact);
            } else if (platform.equals(EPlatform.EMAIL)) {
                otpRecord = otpRepository.findFirstByEmailOrderByExpirationDateDesc(contact);
            }

            if (otpRecord.isEmpty()) {
                throw new BadRequestException("OTP record not found");
            }

            boolean result = passwordEncoder.matches(otpCode, otpRecord.get().getOtpCode());
            log.info("validateOTPForSima result : {}", result);
            if (result) {
                otpRecord.get().setValidationDate(new Date());
                otpRepository.save(otpRecord.get());
            }
            return result;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public boolean resetPassword(PasswordResetRequest request, HttpServletRequest httpRequest, String platform)
            throws BadRequestException {
        if (platform.equals(EPlatform.PHONE.name())) {
            request.setContact(request.getContact()
                    .replace("(", "")
                    .replace(")", "")
                    .replace(" ", "")
                    .replace("-", "")
                    .replace("+", ""));
            if (!request.getContact().startsWith("994")) {
                request.setContact("994" + request.getContact());
            }
        }
        try {
            User user = platform.equals(EPlatform.PHONE.name())
                    ? userRepository.findFirstByPhoneNumber(request.getContact())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                    : userRepository.findByEmail(request.getContact())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (request.getNewPassword().equals(request.getPassword())) {
                if (validateOTP(request.getContact(), request.getOtpCode(), EPlatform.valueOf(platform))) {
                    user.setPassword(passwordEncoder.encode(request.getPassword()));
                    userRepository.save(user);
                    return true;
                }
            } else {
                throw new BadRequestException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest,
            Authentication authentication) throws BadRequestException {
        try {
            var user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())
                    && request.getNewPassword().equals(request.getPassword())) {

                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepository.save(user);
                return true;
            } else {
                throw new BadRequestException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public boolean changeEmail(ChangeEmailRequest request, HttpServletRequest httpRequest) throws BadRequestException {
        try {
            User userExists = userRepository.findByEmail(request.getNewEmail()).orElse(null);

            if (userExists != null && !userExists.getStatus().equals(EUserStatus.DELETED)) {
                throw new BadRequestException("Email already exists");
            }

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (validateOTP(request.getNewEmail(), request.getOtpCode(), EPlatform.EMAIL)) {
                if (request.getEmail().equals(user.getEmail())) {
                    user.setEmail(request.getNewEmail());
                    userRepository.save(user);
                    return true;
                } else {
                    throw new BadRequestException("Emails do not match");
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean changePhone(ChangePhoneRequest request, HttpServletRequest httpRequest) throws BadRequestException {
        try {
            User userExists = userRepository.findFirstByPhoneNumber(request.getNewPhone()).orElse(null);

            if (userExists != null && !userExists.getStatus().equals(EUserStatus.DELETED)) {
                throw new BadRequestException("Phone number already exists");
            }

            User user = userRepository.findFirstByPhoneNumber(request.getPhone())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (validateOTP(request.getNewPhone(), request.getOtpCode(), EPlatform.PHONE)) {
                if (request.getPhone().equals(user.getPhoneNumber())) {
                    user.setPhoneNumber(request.getNewPhone());
                    userRepository.save(user);
                    return true;
                } else {
                    throw new BadRequestException("Emails do not match");
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
        return false;
    }

    private String createOtpCode() {
        Random random = new Random();
        int fourDigit = 100000 + random.nextInt(900000);
        return String.valueOf(fourDigit);
    }
}
