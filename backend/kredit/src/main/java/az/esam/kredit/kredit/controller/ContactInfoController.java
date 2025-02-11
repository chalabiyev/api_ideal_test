package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.ContactInfo;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.content_management.ContactInfoRepository;
import az.esam.kredit.kredit.services.internal.contactInfo.ContactInfoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/content/contact-info")
class ContactInfoController {

    @Autowired
    ContactInfoService contactInfoService;

    @Autowired
    ContactInfoRepository contactInfoRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<ContactInfo> create(@RequestBody ContactInfo request) {
        return ResponseEntity.ok(contactInfoService.add(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<ContactInfo> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        ContactInfo contactInfo = contactInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kontakt məlumatı tapılmadı"));
        patcher.patcher(contactInfo, patch);
        return ResponseEntity.ok(contactInfoService.update(contactInfo));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<ContactInfo> update(@RequestBody ContactInfo request) {
        return ResponseEntity.ok(contactInfoService.update(request));
    }

    @GetMapping("/get")
    public ResponseEntity<ContactInfo> getById(@RequestParam String id) {
        return ResponseEntity.ok(contactInfoService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ContactInfo>> list() {
        return ResponseEntity.ok(contactInfoService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(contactInfoService.delete(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(contactInfoService.count());
    }
}
