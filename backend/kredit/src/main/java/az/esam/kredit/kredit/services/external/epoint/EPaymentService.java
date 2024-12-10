package az.esam.kredit.kredit.services.external.epoint;

import az.esam.kredit.kredit.dtos.requests.payment.InAppPaymentRequest;
import az.esam.kredit.kredit.dtos.requests.payment.PaymentRequest;
import az.esam.kredit.kredit.dtos.responses.payment.PaymentResponse;
import az.esam.kredit.kredit.dtos.responses.payment.PaymentStatusResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.Map;

public interface EPaymentService {

    PaymentResponse startPayment(PaymentRequest paymentRequest) throws JsonProcessingException;

    Map<String, Object> startTokenPayment(PaymentRequest paymentRequest) throws Exception;

    Map<String, Object> applePaySession() throws Exception;

    PaymentStatusResponse applePay(InAppPaymentRequest paymentRequest) throws Exception;

    PaymentStatusResponse googlePay(InAppPaymentRequest paymentRequest) throws Exception;

    PaymentStatusResponse checkPaymentStatus(String transaction) throws JsonProcessingException;
}
