package az.esam.kredit.kredit.dtos.requests.goldenpay;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ToString
@Document(collection = "goldenpay_get_payment_key_request")
public class GetPaymentKeyRequest {
    private String merchantName;
    private Integer amount; // 1AZN = 100, 12.5AZN = 1250
    private String lang; // Azercell - lv, Bakcell - ru, Nar - en
    private String cardType; // visa -v, mastercard - m
    private String description;
    private String hashCode; // md5(auth_key + merchantName + cardType + amount + description)

}
