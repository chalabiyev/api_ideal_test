package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.VehicleInfoResponse;
import az.esam.kredit.kredit.services.internal.refresh.RefreshService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/refresh")
public class RefreshController {

    @Autowired
    private RefreshService refreshService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/personal-info")
    public ResponseEntity<FullIDCardInfoResponse> refreshPersonalInfo(
            @RequestParam String pin,
            @RequestParam String documentNumber,
            Authentication authentication) {
        log.info("Refresh personal info for PIN: {}", pin);
        FullIDCardInfoResponse response = refreshService.refreshPersonalInfo(pin, documentNumber, authentication);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/akb-request")
    public ResponseEntity<String> refreshAKBRequest(
            @RequestParam String pin,
            Authentication authentication) {
        log.info("Refresh AKB request for PIN: {}", pin);
        String result = refreshService.refreshAKBRequest(pin, authentication);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/employee-info")
    public ResponseEntity<EmployeeInfoResponse> refreshEmployeeInfo(
            @RequestParam String pin,
            Authentication authentication) {
        log.info("Refresh employee info for PIN: {}", pin);
        EmployeeInfoResponse response = refreshService.refreshEmployeeInfo(pin, authentication);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/pensioner-info")
    public ResponseEntity<PensionerInfoResponse> refreshPensionerInfo(
            @RequestParam String pin,
            Authentication authentication) {
        log.info("Refresh pensioner info for PIN: {}", pin);
        PensionerInfoResponse response = refreshService.refreshPensionerInfo(pin, authentication);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/vehicle-info")
    public ResponseEntity<List<VehicleInfoResponse>> refreshVehicleInfo(
            @RequestParam String pin,
            Authentication authentication) {
        log.info("Refresh vehicle info for PIN: {}", pin);
        List<VehicleInfoResponse> responseList = refreshService.refreshVehicleInfo(pin, authentication);
        if (responseList == null || responseList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(responseList);
    }
}
