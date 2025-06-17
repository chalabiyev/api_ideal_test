package az.esam.kredit.kredit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import az.esam.kredit.kredit.dtos.requests.CreditRequestSearchDto;
import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.enums.CreditRequestStatusEnum;
import az.esam.kredit.kredit.entities.enums.ECreditType;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.internal.creditRequest.CreditRequestService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = { "*" }, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/creditrequest")
public class CreditRequestController {

    @Autowired
    CreditRequestService creditRequestService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ObjectMapper om;

     @PreAuthorize("isAuthenticated()")
     @SecurityRequirement(name = "authentication")
     @SecurityRequirement(name = "X-API-KEY")
     @PostMapping("/create")
     public ResponseEntity<CreditRequest> create(@RequestBody CreditRequest
     request, Authentication authentication) {
         var user = userRepository.findFirstByUsername(authentication.getName())
         .orElseThrow(() -> new UsernameNotFoundException("User not found"));
         request.setRequestedUser(user);
         return ResponseEntity.ok(creditRequestService.create(request,
         authentication));
     }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/createA")
    public ResponseEntity<CreditRequest> createAdmin(@RequestBody CreditRequest request,
                                                     Authentication authentication) throws Exception {
        if (request.getRequestedUser() == null) {
            throw new Exception("User not found");
        }
        return ResponseEntity.ok(creditRequestService.create(request, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<CreditRequest> update(@RequestBody CreditRequest request) {
        return ResponseEntity.ok(creditRequestService.update(request));
    }

    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/activate")
    public ResponseEntity<SimaQRResponse> activate(
            @RequestParam @NotBlank(message = "Kredit request id boş ola bilməz") String creditRequestId,
            @RequestParam String redirectUrl,
            Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.activate(creditRequestId, redirectUrl, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(creditRequestService.delete(id));
    }

    @GetMapping("/get")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<CreditRequest> getById(@RequestParam String id, Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.get(id, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/list")
    public ResponseEntity<List<CreditRequest>> list() {
        return ResponseEntity.ok(creditRequestService.list());
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count(Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.count(authentication));
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/search")
    public ResponseEntity<Page<CreditRequest>> search(@RequestBody CreditRequestSearchDto search,
                                                      Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.search(search, authentication));
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/countOf/{creditType}")
    public ResponseEntity<Long> countOf(@PathVariable String creditType, Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.countOf(ECreditType.valueOf(creditType), authentication));
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/countOfConfirmStatus/{confirmStatus}")
    public ResponseEntity<Long> countOfConfirmStatus(@PathVariable String confirmStatus,
                                                     Authentication authentication) {
        return ResponseEntity.ok(creditRequestService
                .countOfConfirmStatus(CreditRequestStatusEnum.valueOf(confirmStatus), authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/acceptByAdmin")
    public ResponseEntity<CreditRequest> acceptByAdmin(
            @RequestParam @NotBlank(message = "Kredit request id boş ola bilməz") String creditRequestId,
            Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.acceptByAdmin(creditRequestId, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/rejectByAdmin")
    public ResponseEntity<CreditRequest> rejectByAdmin(
            @RequestParam @NotBlank(message = "Kredit request id boş ola bilməz") String creditRequestId,
            Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.rejectByAdmin(creditRequestId, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/countByCreditYear")
    public ResponseEntity<Long> countByCreditYear(Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.countByCreditYear());
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/sendConfirmation")
    public ResponseEntity<String> sendConfirmation(@RequestParam String urlNumber, Authentication authentication) {
        return ResponseEntity.ok(creditRequestService.sendConfirmation(urlNumber, authentication));
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/acceptConfirmation")
    public ResponseEntity<String> acceptConfirmation(String id, Authentication authentication) {
         return ResponseEntity.ok(creditRequestService.acceptConfirmation(id, authentication));
    }
}
