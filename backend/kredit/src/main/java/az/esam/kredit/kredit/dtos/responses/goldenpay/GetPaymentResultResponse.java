package az.esam.kredit.kredit.dtos.responses.goldenpay;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetPaymentResultResponse {
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