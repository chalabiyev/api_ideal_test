package az.esam.kredit.kredit.dtos.requests.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class PaymentStatusRequest {

    private String public_key;
    private String transaction;
}
