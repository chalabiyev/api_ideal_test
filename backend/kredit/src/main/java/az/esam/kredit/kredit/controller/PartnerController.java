package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.PartnerFormRequest;
import az.esam.kredit.kredit.entities.Partner;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.PartnerRepository;
import az.esam.kredit.kredit.services.internal.partner.PartnerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/partner")
public class PartnerController {

    @Autowired
    PartnerRepository partnerRepository;

    @Autowired
    PartnerService partnerService;

    @Autowired
    Patcher patcher;

    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/sendForm")
    public ResponseEntity<Partner> sendForm(@RequestBody PartnerFormRequest request) throws BadRequestException {
        Partner partner = partnerService.submitForm(request);
        return ResponseEntity.ok(partner);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<Partner> create(@RequestBody Partner request) {
        Partner partner = partnerService.add(request);
        return ResponseEntity.ok(partner);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<Partner> update(@RequestBody Partner request) {
        Partner partner = partnerService.update(request);
        return ResponseEntity.ok(partner);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Partner> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Acoustic with this id does not exist"));
        patcher.patcher(partner, patch);
        return ResponseEntity.ok(partnerService.update(partner));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/changeStatus")
    public ResponseEntity<Partner> changeStatus(
            @RequestParam @NotBlank(message = "Id null ola bilməz") String id,
            @RequestParam @NotBlank(message = "Status null ola bilməz") String status,
            Authentication authentication
    ) throws BadRequestException {
        Partner partner = partnerService.changeStatus(id, status.toUpperCase(), authentication);
        return ResponseEntity.ok(partner);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(partnerService.delete(id));
    }

    @GetMapping("/get")
    public ResponseEntity<Partner> getById(@RequestParam String id) {
        return ResponseEntity.ok(partnerService.get(id));
    }

    @GetMapping
    public Page<Partner> getSessions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return partnerService.get(page, size);
    }


    @GetMapping("/list")
    public ResponseEntity<List<Partner>> list() {
        return ResponseEntity.ok(partnerService.listAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(partnerService.count());
    }

}
