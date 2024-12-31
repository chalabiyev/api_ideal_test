package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.CreditRequestSearchDto;
import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.CreditRequestDto;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.ECreditType;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.internal.creditRequest.CreditRequestService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
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
    public ResponseEntity<CreditRequest> create(@RequestBody CreditRequest request, Authentication authentication) {
        var user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        request.setRequestedUser(user);
        return ResponseEntity.ok(creditRequestService.create(request, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/createA")
    public ResponseEntity<CreditRequest> createAdmin(@RequestBody CreditRequestDto requestdto, Authentication authentication) throws Exception {
        Optional<User> user = userRepository.findByUsername(requestdto.getRequestedUserPin());
        if (user.isEmpty()) {
            user = userRepository.findByPin(requestdto.getRequestedUserPin());
        }
        CreditRequest request = om.readValue(om.writeValueAsString(requestdto), CreditRequest.class);
        if (user.isPresent()) {
            request.setRequestedUser(user.get());
        } else {
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
            Authentication authentication
    ) {
        return ResponseEntity.ok(creditRequestService.activate(creditRequestId, authentication));
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

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(creditRequestService.count());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/search")
    public ResponseEntity<Page<CreditRequest>> search(@RequestBody CreditRequestSearchDto search) {
        return ResponseEntity.ok(creditRequestService.search(search));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/countOf/{creditType}")
    public ResponseEntity<Long> countOf(@PathVariable String creditType) {
        return ResponseEntity.ok(creditRequestService.countOf(ECreditType.valueOf(creditType)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/acceptByAdmin")
    public ResponseEntity<CreditRequest> acceptByAdmin(
            @RequestParam @NotBlank(message = "Kredit request id boş ola bilməz") String creditRequestId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(creditRequestService.acceptByAdmin(creditRequestId, authentication));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/rejectByAdmin")
    public ResponseEntity<CreditRequest> rejectByAdmin(
            @RequestParam @NotBlank(message = "Kredit request id boş ola bilməz") String creditRequestId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(creditRequestService.rejectByAdmin(creditRequestId, authentication));
    }
}
