package az.esam.kredit.kredit.dtos.responses.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author cihan
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class PaymentResponse {

    private String status;
    private String redirect_url;
    private String transaction;
    private String message;
}
