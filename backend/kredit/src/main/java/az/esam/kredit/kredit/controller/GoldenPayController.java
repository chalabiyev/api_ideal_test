package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.goldenpay.GetPaymentKeyRequest;
import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentKeyResponse;
import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentResultResponse;
import az.esam.kredit.kredit.services.external.goldenpay.GoldenPayService;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/goldenpay")
public class GoldenPayController {

    @Autowired
    private GoldenPayService goldenPayService;

    @PostMapping("/getPaymentKey")
    public ResponseEntity<GetPaymentKeyResponse> getPaymentKey(@RequestBody GetPaymentKeyRequest request) {
        return ResponseEntity.ok(goldenPayService.getPaymentKey(request));
    }

    @GetMapping("/getPaymentRequest")
    public ResponseEntity<GetPaymentResultResponse> getPaymentRequest(
            @RequestParam @NotBlank(message = "Payment Key boş ola bilməz") String paymentKey,
            @RequestParam @NotBlank(message = "Hash Code boş ola bilməz") String hashCode) {
        return ResponseEntity.ok(goldenPayService.getPaymentRequest(paymentKey, hashCode));
    }
}