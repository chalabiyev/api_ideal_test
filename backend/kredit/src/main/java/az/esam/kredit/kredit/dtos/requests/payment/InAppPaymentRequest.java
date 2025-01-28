package az.esam.kredit.kredit.dtos.requests.payment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class InAppPaymentRequest {

    private String id;
    private String public_key;
    private String token;
    private String billingContact;
}
