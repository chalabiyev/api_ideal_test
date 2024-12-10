package az.esam.kredit.kredit.dtos.requests.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class InAppPaymentRequest {

    private String id;
    private String public_key;
    private String token;
    private String billingContact;
}
