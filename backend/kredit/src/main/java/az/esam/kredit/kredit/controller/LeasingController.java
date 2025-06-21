package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.Leasing;
import org.springframework.http.ResponseEntity;
import az.esam.kredit.kredit.services.internal.leasing.LeasingService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sound.midi.Patch;

@Slf4j
@CrossOrigin(origins = { "*" }, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/leasing")
public class LeasingController {

    @Autowired
    private LeasingService leasingService;

    @PostMapping("/send")
    public ResponseEntity<String> sendToNextEmail(@RequestBody Leasing leasing) {
        String emailUsed = leasingService.sendRequestToNextEmail(leasing);
        return ResponseEntity.ok("Request sent to: " + emailUsed);
    }
}
