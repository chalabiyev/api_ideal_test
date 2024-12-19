package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.CreditRequestStatusEnum;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.repositories.CreditRequestRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/creditrequest")
public class CreditRequestController {

    @Autowired
    CreditRequestRepository creditRequestRepository;

    @Autowired
    UserRepository userRepository;

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<CreditRequest> create(@RequestBody CreditRequest request, Authentication authentication) {
        var user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        request.setRequestDate(new Date());
        if (request.getCreditAmount() == null) {
            request.setCreditAmount(499d);
        }
        request.setConfirmStatus(CreditRequestStatusEnum.Requested);
        request.setRequestedUser(user);
        return ResponseEntity.ok(creditRequestRepository.insert(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<CreditRequest> update(@RequestBody CreditRequest request) {
        return ResponseEntity.ok(creditRequestRepository.save(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        creditRequestRepository.deleteById(id);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/get")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<CreditRequest> getById(@RequestParam String id, Authentication authentication) {
        var user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(id).orElseThrow();
        if (user.getRoles().stream().filter(f -> f.getName() == ERole.ROLE_ADMIN).count() == 0) {
            if (creditRequest.getRequestedUser().getId().equals(user.getId())) {
                return ResponseEntity.ok(creditRequest);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.ok(creditRequest);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/list")
    public ResponseEntity<List<CreditRequest>> list() {
        return ResponseEntity.ok(creditRequestRepository.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(creditRequestRepository.count());
    }

}
