package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.payment.CardRegistrationRequest;
import az.esam.kredit.kredit.dtos.requests.payment.InAppPaymentRequest;
import az.esam.kredit.kredit.dtos.requests.payment.PaymentRequest;
import az.esam.kredit.kredit.dtos.requests.payment.TransferMoneyRequest;
import az.esam.kredit.kredit.dtos.responses.payment.CardRegistrationResponse;
import az.esam.kredit.kredit.dtos.responses.payment.PaymentResponse;
import az.esam.kredit.kredit.dtos.responses.payment.PaymentStatusResponse;
import az.esam.kredit.kredit.dtos.responses.payment.TransferMoneyResponse;
import az.esam.kredit.kredit.services.external.epoint.EPaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/e-payment")
public class EPaymentController {

    Logger logger = LoggerFactory.getLogger(EPaymentController.class);

    @Autowired
    private EPaymentService ePaymentService;

    @PostMapping("/start-payment")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<PaymentResponse> startPayment(@RequestBody @Validated PaymentRequest paymentRequest, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException {
        PaymentResponse response = ePaymentService.startPayment(paymentRequest);
        logger.info("startPayment method called");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-payment/{transaction}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<PaymentStatusResponse> checkPaymentStatus(@PathVariable("transaction") String transaction, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException {
        PaymentStatusResponse response = ePaymentService.checkPaymentStatus(transaction);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/start-token-payment")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> startTokenPayment(@RequestBody @Validated PaymentRequest paymentRequest, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException, Exception {
        Map<String, Object> response = ePaymentService.startTokenPayment(paymentRequest);
        logger.info("startTokenPayment method called");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/apple/session")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> applePaySession(Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException, Exception {
        Map<String, Object> response = ePaymentService.applePaySession();
        logger.info("applePaySession method called");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/apple/pay")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<PaymentStatusResponse> applePay(@RequestBody @Validated InAppPaymentRequest request, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException, Exception {
        PaymentStatusResponse response = ePaymentService.applePay(request);
        logger.info("applePay method called");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google/pay")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<PaymentStatusResponse> googlePay(@RequestBody @Validated InAppPaymentRequest request, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException, Exception {
        PaymentStatusResponse response = ePaymentService.googlePay(request);
        logger.info("googlePay method called");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/card-registration")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> cardRegistration(@RequestBody @Validated CardRegistrationRequest cardRegistrationRequest, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException, Exception {
        CardRegistrationResponse cardRegistrationResponse = ePaymentService.registerCard(cardRegistrationRequest);
        logger.info("cardRegistration method called");
        return ResponseEntity.ok(cardRegistrationResponse);
    }

    @PostMapping("/transfer")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<TransferMoneyResponse> transfer(@RequestBody @Validated TransferMoneyRequest request, Authentication authentication, HttpServletRequest httpServletRequest) throws JsonProcessingException, Exception {
        TransferMoneyResponse response = ePaymentService.transferAmount(request);
        logger.info("transfer method called");
        return ResponseEntity.ok(response);
    }

}
