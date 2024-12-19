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
@Document(collection = "cardRegistration_requests")
public class CardRegistrationRequest {

    @Id
    private String id;
    private String public_key;
    private String language;
/*
    refund: Kart növü: 0- ödəniş üçün kart; 1- vəsaitlərin
    köçürülməsi üçün kart.
 */

    private int refund;
    private String order_id;
    private String description;
    private String success_redirect_url;
    private String error_redirect_url;
}
