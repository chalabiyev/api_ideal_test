package az.esam.kredit.kredit.dtos.requests.payment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaymentStatusRequest {

    private String public_key;
    private String transaction;
}
