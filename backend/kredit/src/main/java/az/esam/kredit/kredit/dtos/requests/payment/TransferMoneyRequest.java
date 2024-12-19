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
@Document(collection = "transferMoney_requests")
public class TransferMoneyRequest {

    @Id
    private String id;
    private String public_key;
    private String language;
/*
    refund: Kart növü: 0- ödəniş üçün kart; 1- vəsaitlərin
    köçürülməsi üçün kart.
 */

    private String card_id;
    private String order_id;
    private double amount;
    private String currency;
    private String description;
}
