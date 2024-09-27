package az.esam.kredit.kredit.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChangePhoneRequest {

    private String phone;
    private String newPhone;
    private String otpCode;
}
