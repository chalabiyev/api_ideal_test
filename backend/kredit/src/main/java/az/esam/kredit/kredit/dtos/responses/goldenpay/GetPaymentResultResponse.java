package az.esam.kredit.kredit.dtos.responses.goldenpay;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "goldenpay_get_payment_key_response")
public class GetPaymentResultResponse {
    @Id
    private String id;

    private Status status;
    private String paymentKey;
    private String merchantName;
    private Integer amount;
    private Integer checkCount;
    private String paymentDate;
    private String cardNumber;
    private String language;
    private String rrn;
}