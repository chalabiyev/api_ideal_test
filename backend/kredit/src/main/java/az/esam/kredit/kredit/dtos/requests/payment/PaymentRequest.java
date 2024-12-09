package az.esam.kredit.kredit.dtos.requests.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Document(collection = "payment_requests")
public class PaymentRequest {

    @Id
    private String id;
    private String public_key;
    private double amount;
    private String currency;
    private String language;
    private String order_id;
    private String description;
    private String success_redirect_url;
    private String error_redirect_url;

}
