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
        log.info("Request from : {}", request.getRemoteAddr());
        return ResponseEntity.ok(documentInfoService.getIdCardInfo(documentNumber, pin));
    }

    @GetMapping("/getMobileNumbersWithPin")
    public ResponseEntity<?> getMobileNumbersWithPin(@RequestParam String pin) {
        return ResponseEntity.ok(documentInfoService.getMobileNumbersWithPin(pin));
    }

}
