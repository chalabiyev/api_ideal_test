package az.esam.kredit.kredit.services.internal.otp;

import az.esam.kredit.kredit.dtos.requests.ChangeEmailRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePasswordRequest;
import az.esam.kredit.kredit.dtos.requests.ChangePhoneRequest;
import az.esam.kredit.kredit.dtos.requests.OTPRequest;
import az.esam.kredit.kredit.dtos.requests.PasswordResetRequest;
import az.esam.kredit.kredit.entities.enums.EPlatform;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;

import javax.management.BadAttributeValueExpException;

public interface OTPService {

    boolean sendOtp(OTPRequest request, String platform) throws BadRequestException;

    boolean validateOTP(String contact, String otpCode, EPlatform platform) throws BadRequestException;

    boolean resetPassword(PasswordResetRequest request, HttpServletRequest httpRequest, String platform) throws BadRequestException;

    boolean changePassword(ChangePasswordRequest request, HttpServletRequest httpRequest, Authentication authentication) throws BadRequestException;

    boolean changeEmail(ChangeEmailRequest request, HttpServletRequest httpRequest) throws BadRequestException;

    boolean changePhone(ChangePhoneRequest request, HttpServletRequest httpRequest) throws BadRequestException;
}