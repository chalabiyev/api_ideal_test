package az.esam.kredit.kredit.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChangePasswordRequest {

    private String phone;
    private String currentPassword;
    private String password;
    private String newPassword;
}
