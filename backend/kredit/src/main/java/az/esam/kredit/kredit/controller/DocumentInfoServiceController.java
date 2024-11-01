package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/document")
public class DocumentInfoServiceController {

    @Autowired
    DocumentInfoService documentInfoService;

    @GetMapping("/getIdCardInfo")
    public ResponseEntity<?> getIdCardInfo(@RequestParam String documentNumber, @RequestParam String pin, HttpServletRequest request) {
        return ResponseEntity.ok(documentInfoService.getIdCardInfo(documentNumber, pin));
    }

    @GetMapping("/getMobileNumbersWithPin")
    public ResponseEntity<?> getMobileNumbersWithPin(@RequestParam String pin) {
        return ResponseEntity.ok(documentInfoService.getMobileNumbersWithPin(pin));
    }

    @GetMapping("/getCheckNumberWithPin")
    public ResponseEntity<?> getCheckNumberWithPin(@RequestParam String pin, @RequestParam String number) {
        return ResponseEntity.ok(documentInfoService.getCheckNumberWithPin(pin, number));
    }

    @GetMapping("/getDocumentInfoByPhone")
    public ResponseEntity<?> getDocumentInfoByPhone(@RequestParam String phoneNumber) {
        return ResponseEntity.ok(documentInfoService.getDocumentInfoByPhone(phoneNumber));
    }

    @GetMapping("/getVehicleInfoByPin")
    public ResponseEntity<?> getVehicleInfoByPin(@RequestParam String pin) {
        return ResponseEntity.ok(documentInfoService.getVehicleInfoByPin(pin));
    }

    @GetMapping("/getMigrationInfo")
    public ResponseEntity<?> getMigrationInfo(@RequestParam String migrationDocNumber, @RequestParam String migrationPin) {
        return ResponseEntity.ok(documentInfoService.getMigrationInfo(migrationDocNumber, migrationPin));
    }

    @GetMapping("/getPassportInfo")
    public ResponseEntity<?> getPassportInfo(@RequestParam String foreignDocNumber, @RequestParam String foreignPin) {
        return ResponseEntity.ok(documentInfoService.getPassportInfo(foreignDocNumber, foreignPin));
    }

    @GetMapping("/getInfoByVoen")
    public ResponseEntity<?> getInfoByVoen(@RequestParam String voen) {
        return ResponseEntity.ok(documentInfoService.getInfoByVoen(voen));
    }

}
