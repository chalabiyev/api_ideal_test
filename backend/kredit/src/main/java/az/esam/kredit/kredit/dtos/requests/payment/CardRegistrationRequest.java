package az.esam.kredit.kredit.dtos.requests.payment;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
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
    private String description;
    private String success_redirect_url;
    private String error_redirect_url;
}
