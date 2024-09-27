package az.esam.kredit.kredit.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChangeEmailRequest {

    private String email;
    private String newEmail;
    private String otpCode;
}
