package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.asanfinance.AsanFinanceRequest;
import az.esam.kredit.kredit.dtos.responses.asanfinance.AsanFinanceResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.balance.BalanceInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.expenses.ExpensesResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.farm.FarmInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.passport.PassportInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.payment.PaymentInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.PersonalInfoAllResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.vin.VinInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.voen.VoenInfoResponse;
import az.esam.kredit.kredit.services.external.asanfinance.AsanFinanceService;
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
@RequestMapping("/api/asan-finance")
public class AsanFinanceController {

    @Autowired
    private AsanFinanceService asanFinanceService;

    @GetMapping("/getFarmInfoByPin")
    public ResponseEntity<FarmInfoResponse> getFarmInfoByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getFarmInfoByPin(pin, fetchFromService));
    }

    @GetMapping("/getFarmInfoByVoen")
    public ResponseEntity<FarmInfoResponse> getFarmInfoByVoen(
            @RequestParam @NotBlank(message = "VOEN boş ola bilməz") String voen,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getFarmInfoByVoen(voen, fetchFromService));
    }

    @GetMapping("/getPersonalInfoAllByPin")
    public ResponseEntity<PersonalInfoAllResponse> getPersonalInfoAllByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getPersonalInfoAllByPin(pin, fetchFromService));
    }

    @GetMapping("/getPersonalInfoByPin")
    public ResponseEntity<PersonalInfoAllResponse> getPersonalInfoByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getPersonalInfoByPin(pin, fetchFromService));
    }

    @GetMapping("/getEmployeeInfoByPin")
    public ResponseEntity<EmployeeInfoResponse> getEmployeeInfoByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getEmployeeInfoByPin(pin, fetchFromService));
    }

    @GetMapping("/getPensionerInfoByPin")
    public ResponseEntity<PensionerInfoResponse> getPensionerInfoByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getPensionerInfoByPin(pin, fetchFromService));
    }

    @GetMapping("/getForeignPassportInfoByPin")
    public ResponseEntity<PassportInfoResponse> getForeignPassportInfoByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getForeignPassportInfoByPin(pin, fetchFromService));
    }

    @GetMapping("/getVinInfoByVin")
    public ResponseEntity<VinInfoResponse> getVinInfoByVin(
            @RequestParam @NotBlank(message = "VIN boş ola bilməz") String vin,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getVinInfoByVin(vin, fetchFromService));
    }

    @GetMapping("/getVoenInfoByVoen")
    public ResponseEntity<VoenInfoResponse> getVoenInfoByVoen(
            @RequestParam @NotBlank(message = "VOEN boş ola bilməz") String voen,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getVoenInfoByVoen(voen, fetchFromService));
    }

    @GetMapping("/getPersonalInfoByPinAndDocument")
    public ResponseEntity<PersonalInfoAllResponse> getPersonalInfoByPinAndDocument(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam @NotBlank(message = "Seriya nömrəsi boş ola bilməz") String documentNumber,
            @RequestParam(required = false, defaultValue = "false") boolean fetchFromService
    ) {
        return ResponseEntity.ok(asanFinanceService.getPersonalInfoByPinAndDocument(pin, documentNumber, fetchFromService));
    }

    @PostMapping("/getExpensesInfo")
    public ResponseEntity<AsanFinanceResponse<ExpensesResponse>> getExpensesInfo(
            @RequestBody AsanFinanceRequest asanFinanceRequest) {
        return ResponseEntity.ok(asanFinanceService.getExpensesInfo(asanFinanceRequest));
    }

    @PostMapping("/getPaymentsInfo")
    public ResponseEntity<AsanFinanceResponse<PaymentInfoResponse>> getPaymentsInfo(
            @RequestBody AsanFinanceRequest asanFinanceRequest) {
        return ResponseEntity.ok(asanFinanceService.getPaymentsInfo(asanFinanceRequest));
    }

    @PostMapping("/getBalanceInfo")
    public ResponseEntity<AsanFinanceResponse<BalanceInfoResponse>> getBalanceInfo(
            @RequestBody AsanFinanceRequest asanFinanceRequest) {
        return ResponseEntity.ok(asanFinanceService.getBalanceInfo(asanFinanceRequest));
    }
}