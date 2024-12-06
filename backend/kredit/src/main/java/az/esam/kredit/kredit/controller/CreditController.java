package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.Credit;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.CreditRepository;
import az.esam.kredit.kredit.services.internal.credit.CreditService;
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
@RequestMapping("/api/credit")
public class CreditController {

    @Autowired
    CreditRepository creditRepository;

    @Autowired
    CreditService creditService;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<Credit> create(@RequestBody Credit request) {
        Credit credit = creditService.add(request);
        return ResponseEntity.ok(credit);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<Credit> update(@RequestBody Credit request) {
        Credit credit = creditService.update(request);
        return ResponseEntity.ok(credit);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Credit> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        Credit credit = creditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Acoustic with this id does not exist"));
        patcher.patcher(credit, patch);
        return ResponseEntity.ok(creditService.update(credit));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(creditService.delete(id));
    }

    @GetMapping("/get")
    public ResponseEntity<Credit> getById(@RequestParam String id) {
        return ResponseEntity.ok(creditService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Credit>> list() {
        return ResponseEntity.ok(creditService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(creditService.count());
    }

}
