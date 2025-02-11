package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.Insurance;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.content_management.InsuranceRepository;
import az.esam.kredit.kredit.services.internal.insurance.InsuranceService;
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
@RequestMapping("/api/content/insurance")
public class InsuranceController {

    @Autowired
    InsuranceService insuranceService;

    @Autowired
    InsuranceRepository insuranceRepository;

    @Autowired
    Patcher patcher;
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<Insurance> create(@RequestBody Insurance request) {
        Insurance insurance = insuranceService.add(request);
        return ResponseEntity.ok(insurance);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<Insurance> update(@RequestBody Insurance request) {
        Insurance insurance = insuranceService.update(request);
        return ResponseEntity.ok(insurance);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Insurance> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        Insurance insurance = insuranceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Acoustic with this id does not exist"));
        patcher.patcher(insurance, patch);
        return ResponseEntity.ok(insuranceService.update(insurance));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(insuranceService.delete(id));
    }

    @GetMapping("/get")
    public ResponseEntity<Insurance> getById(@RequestParam String id) {
        return ResponseEntity.ok(insuranceService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<List<Insurance>>> list() {
        return ResponseEntity.ok(insuranceService.list());
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Insurance>> listAll() {
        return ResponseEntity.ok(insuranceService.listAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(insuranceService.count());
    }

}