package az.esam.kredit.kredit.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PasswordResetRequest {

    private String contact;
    private String otpCode;
    private String password;
    private String newPassword;
}
