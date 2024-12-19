package az.esam.kredit.kredit.services.external.epoint;

import az.esam.kredit.kredit.dtos.requests.payment.*;
import az.esam.kredit.kredit.dtos.responses.payment.*;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.Map;

public interface EPaymentService {

    PaymentResponse startPayment(PaymentRequest paymentRequest) throws JsonProcessingException;

    Map<String, Object> startTokenPayment(PaymentRequest paymentRequest) throws Exception;

    Map<String, Object> applePaySession() throws Exception;

    PaymentStatusResponse applePay(InAppPaymentRequest paymentRequest) throws Exception;

    PaymentStatusResponse googlePay(InAppPaymentRequest paymentRequest) throws Exception;

    PaymentStatusResponse checkPaymentStatus(String transaction) throws JsonProcessingException;

    CardRegistrationResponse registerCard(CardRegistrationRequest cardRegistrationRequest) throws Exception;

    CardRegistrationWithPayResponse registerCardWithPay(CardRegistrationWithPayRequest cardRegistrationRequest) throws Exception;

    TransferMoneyResponse transferAmount(TransferMoneyRequest transferAmountRequest) throws Exception;
}
