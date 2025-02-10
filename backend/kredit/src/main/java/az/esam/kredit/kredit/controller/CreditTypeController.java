package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.CreditType;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.content_management.CreditTypeRepository;
import az.esam.kredit.kredit.services.internal.creditType.CreditTypeService;
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
@RequestMapping("/api/credit-type")
public class CreditTypeController {

    @Autowired
    CreditTypeRepository creditTypeRepository;

    @Autowired
    CreditTypeService creditTypeService;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<CreditType> create(@RequestBody CreditType request) {
        CreditType creditType = creditTypeService.add(request);
        return ResponseEntity.ok(creditType);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<CreditType> update(@RequestBody CreditType request) {
        CreditType creditType = creditTypeService.update(request);
        return ResponseEntity.ok(creditType);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<CreditType> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        CreditType creditType = creditTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Acoustic with this id does not exist"));
        patcher.patcher(creditType, patch);
        return ResponseEntity.ok(creditTypeService.update(creditType));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(creditTypeService.delete(id));
    }

    @GetMapping("/get")
    public ResponseEntity<CreditType> getById(@RequestParam String id) {
        return ResponseEntity.ok(creditTypeService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<CreditType>> list() {
        return ResponseEntity.ok(creditTypeService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(creditTypeService.count());
    }

}
