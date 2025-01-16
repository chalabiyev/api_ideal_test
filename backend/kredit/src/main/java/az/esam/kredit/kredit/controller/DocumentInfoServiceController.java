package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.responses.document.*;
import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/document")
public class DocumentInfoServiceController {

    @Autowired
    DocumentInfoService documentInfoService;

    @GetMapping("/getIdCardInfo")
    public ResponseEntity<FullIDCardInfoResponse> getIdCardInfo(
            @RequestParam @NotBlank(message = "Seriya nömrəsi boş ola bilməz") String documentNumber,
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin, HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(documentInfoService.getIdCardInfo(documentNumber, pin));
    }

    @GetMapping("/getMobileNumbersWithPin")
    public ResponseEntity<List<MobileNumberResponse>> getMobileNumbersWithPin(@RequestParam @NotBlank(message = "PIN cannot be blank") String pin) {
        return ResponseEntity.ok(documentInfoService.getMobileNumbersWithPin(pin));
    }

    @GetMapping("/getCheckNumberWithPin")
    public ResponseEntity<CheckNumberWithPinResponse> getCheckNumberWithPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin,
            @RequestParam @NotBlank(message = "Telefon nömrəsi boş ola bilməz") String number) {
        return ResponseEntity.ok(documentInfoService.getCheckNumberWithPin(pin, number));
    }

    @GetMapping("/getDocumentInfoByPhone")
    public ResponseEntity<DocumentInfoByMobileNumberResponse> getDocumentInfoByPhone(@RequestParam @NotBlank(message = "Telefon nömrəsi boş ola bilməz") String phoneNumber) throws IOException {
        return ResponseEntity.ok(documentInfoService.getDocumentInfoByPhone(phoneNumber));
    }

    @GetMapping("/getVehicleInfoByPin")
    public ResponseEntity<List<VehicleInfoResponse>> getVehicleInfoByPin(@RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin) throws IOException {
        return ResponseEntity.ok(documentInfoService.getVehicleInfoByPin(pin));
    }

    @GetMapping("/getMigrationInfo")
    public ResponseEntity<MigrationDocumentInfoResponse> getMigrationInfo(
            @RequestParam @NotBlank(message = "Seriya nömrəsi boş ola bilməz") String migrationDocNumber,
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String migrationPin
    ) {
        return ResponseEntity.ok(documentInfoService.getMigrationInfo(migrationDocNumber, migrationPin));
    }

    @GetMapping("/getPassportInfo")
    public ResponseEntity<PassportDocumentInfoResponse> getPassportInfo(
            @RequestParam @NotBlank(message = "Seriya nömrəsi boş ola bilməz") String foreignDocNumber,
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String foreignPin
    ) {
        return ResponseEntity.ok(documentInfoService.getPassportInfo(foreignDocNumber, foreignPin));
    }

    @GetMapping("/getInfoByVoen")
    public ResponseEntity<VoenInfoResponse> getInfoByVoen(@RequestParam @NotBlank(message = "Vöen boş ola bilməz") String voen) {
        return ResponseEntity.ok(documentInfoService.getInfoByVoen(voen));
    }

    @GetMapping("/getIdCardInfoByPin")
    public ResponseEntity<FullIDCardInfoResponse> getIdCardInfoByPin(
            @RequestParam @NotBlank(message = "Fin kod boş ola bilməz") String pin, HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(documentInfoService.getIdCardInfoByPin(pin));
    }

}
