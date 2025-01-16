package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.CreditCard;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.CreditCardRepository;
import az.esam.kredit.kredit.services.internal.creditCard.CreditCardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/credit-card")
public class CreditCardController {

    @Autowired
    CreditCardService creditCardService;

    @Autowired
    CreditCardRepository creditRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<CreditCard> create(@RequestBody CreditCard request) {
        CreditCard credit = creditCardService.add(request);
        return ResponseEntity.ok(credit);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<CreditCard> update(@RequestBody CreditCard request) {
        CreditCard credit = creditCardService.update(request);
        return ResponseEntity.ok(credit);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<CreditCard> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        CreditCard credit = creditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Acoustic with this id does not exist"));
        patcher.patcher(credit, patch);
        return ResponseEntity.ok(creditCardService.update(credit));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(creditCardService.delete(id));
    }

    @GetMapping("/get")
    public ResponseEntity<CreditCard> getById(@RequestParam String id) {
        return ResponseEntity.ok(creditCardService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<CreditCard>> list() {
        return ResponseEntity.ok(creditCardService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(creditCardService.count());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping
    public Page<CreditCard> getSessions(
            @RequestParam(required = false) String cardNumber,
            @RequestParam(required = false) String cvv,
            @RequestParam(required = false) String expiryDate,
            @RequestParam(required = false) String serialNumber,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return creditCardService.getCards(cardNumber, cvv, expiryDate, serialNumber, page, size);
    }
}
