package az.esam.kredit.kredit.services.internal.otp;

import az.esam.kredit.kredit.dtos.requests.ChangeEmailRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePasswordRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePhoneRequest;
import az.esam.kredit.kredit.dtos.requests.OTPRequest;
import az.esam.kredit.kredit.dtos.requests.PasswordResetRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface OTPService {

    boolean sendOtp(OTPRequest request, boolean isPhone);

    boolean validateOTP(String email, String otpCode, boolean isPhone);

    boolean resetPassword(PasswordResetRequest request, HttpServletRequest httpRequest, boolean isPhone);

    boolean changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest, Authentication authentication);

    boolean changeEmail(ChangeEmailRequest request, HttpServletRequest httpRequest);

    boolean changePhone(ChangePhoneRequest request, HttpServletRequest httpRequest);
}