package az.esam.kredit.kredit.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SimaTokenRequest {

    @NotBlank
    private String operationId;
    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String otpCode;
    private String password;
}
