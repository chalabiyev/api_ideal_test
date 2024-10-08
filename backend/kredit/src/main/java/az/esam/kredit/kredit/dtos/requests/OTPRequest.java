package az.esam.kredit.kredit.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class OTPRequest {

    private String contact;
    private String clientUUID;
    private String ipAddress;
}
