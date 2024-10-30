package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/document")
public class DocumentInfoServiceController {

    @Autowired
    DocumentInfoService documentInfoService;

    @GetMapping("/getIdCardInfo")
    public String getIdCardInfo(String documentNumber, String pin) {
        return documentInfoService.getIdCardInfo(documentNumber, pin).toString();
    }

    @GetMapping("/getMobileNumbersWithPin")
    public String getMobileNumbersWithPin(String pin) {
        return documentInfoService.getMobileNumbersWithPin(pin).toString();
    }

}
