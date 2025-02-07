package az.esam.kredit.kredit.services.external.goldenpay;

import az.esam.kredit.kredit.dtos.requests.goldenpay.GetPaymentKeyRequest;
import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentKeyResponse;
import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentResultResponse;

public interface GoldenPayService {

    GetPaymentKeyResponse getPaymentKey(GetPaymentKeyRequest request);

    GetPaymentResultResponse getPaymentResult(String paymentKey);
}
