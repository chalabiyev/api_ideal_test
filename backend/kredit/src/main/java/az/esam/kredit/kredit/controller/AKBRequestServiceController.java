package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByIdCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByPassportRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByServiceCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByTaxNoRequest;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.GetBalanceResponse;
import az.esam.kredit.kredit.services.external.akb.requestService.AKBRequestService;
import com.fasterxml.jackson.databind.JsonNode;
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
@RequestMapping("/api/akb")
public class AKBRequestServiceController {

    @Autowired
    private AKBRequestService akbRequestService;

    @PostMapping("/inquireByIdCard")
    public ResponseEntity<JsonNode> inquireByIdCard(@RequestBody InquireByIdCardRequest akbRequest) {
        return ResponseEntity.ok(akbRequestService.inquireByIdCard(akbRequest));
    }

    @PostMapping("/inquireByPassport")
    public ResponseEntity<JsonNode> inquireByPassport(@RequestBody InquireByPassportRequest akbRequest) {
        return ResponseEntity.ok(akbRequestService.inquireByPassport(akbRequest));
    }

    @PostMapping("/inquireByServiceCard")
    public ResponseEntity<JsonNode> inquireByServiceCard(@RequestBody InquireByServiceCardRequest akbRequest) {
        return ResponseEntity.ok(akbRequestService.inquireByServiceCard(akbRequest));
    }

    @PostMapping("/inquireByTaxNo")
    public ResponseEntity<JsonNode> inquireByTaxNo(@RequestBody InquireByTaxNoRequest akbRequest) {
        return ResponseEntity.ok(akbRequestService.inquireByTaxNo(akbRequest));
    }

    @GetMapping("/inquireUtilityServices")
    public ResponseEntity<JsonNode> inquireUtilityServices(
            @RequestParam @NotBlank(message = "ReportId boş ola bilməz") String reportId) {
        return ResponseEntity.ok(akbRequestService.inquireUtilityServices(reportId));
    }

    @GetMapping("/getBorrowerScore")
    public ResponseEntity<JsonNode> getBorrowerScore(
            @RequestParam @NotBlank(message = "ReportId boş ola bilməz") String reportId) {
        return ResponseEntity.ok(akbRequestService.getBorrowerScore(reportId));
    }

    @GetMapping("/getBalance")
    public ResponseEntity<GetBalanceResponse> getBalance() {
        return ResponseEntity.ok(akbRequestService.getBalance());
    }

    @GetMapping("/lkpBorrInquiryPurposes")
    public ResponseEntity<JsonNode> lkpBorrInquiryPurposes() {
        return ResponseEntity.ok(akbRequestService.lkpBorrInquiryPurposes());
    }

    @GetMapping("/lkpCollateralTypes")
    public ResponseEntity<JsonNode> lkpCollateralTypes() {
        return ResponseEntity.ok(akbRequestService.lkpCollateralTypes());
    }

    @GetMapping("/lkpCountries")
    public ResponseEntity<JsonNode> lkpCountries() {
        return ResponseEntity.ok(akbRequestService.lkpCountries());
    }

    @GetMapping("/lkpCreditClassTypes")
    public ResponseEntity<JsonNode> lkpCreditClassTypes() {
        return ResponseEntity.ok(akbRequestService.lkpCreditClassTypes());
    }

    @GetMapping("/lkpCreditPurposeTypes")
    public ResponseEntity<JsonNode> lkpCreditPurposeTypes() {
        return ResponseEntity.ok(akbRequestService.lkpCreditPurposeTypes());
    }

    @GetMapping("/lkpCreditStatusTypes")
    public ResponseEntity<JsonNode> lkpCreditStatusTypes() {
        return ResponseEntity.ok(akbRequestService.lkpCreditStatusTypes());
    }

    @GetMapping("/lkpCreditTypes")
    public ResponseEntity<JsonNode> lkpCreditTypes() {
        return ResponseEntity.ok(akbRequestService.lkpCreditTypes());
    }

    @GetMapping("/lkpCurrencies")
    public ResponseEntity<JsonNode> lkpCurrencies() {
        return ResponseEntity.ok(akbRequestService.lkpCurrencies());
    }
}