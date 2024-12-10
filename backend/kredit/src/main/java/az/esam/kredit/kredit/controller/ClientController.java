package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.AppPageRequest;
import az.esam.kredit.kredit.dtos.responses.MessageResponse;
import az.esam.kredit.kredit.entities.Client;
import az.esam.kredit.kredit.helper.Helper;
import az.esam.kredit.kredit.repositories.ClientRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author cihan
 */
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/client")
public class ClientController {

    
    @Autowired
    ClientRepository repository;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> create(@Valid @RequestBody Client clientRecord, Authentication authentication) {
        try {
            if (repository.findByName(clientRecord.getName()).isPresent() || repository.findByIpAddress(clientRecord.getIpAddress()).isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(new MessageResponse(HttpStatus.CONFLICT, "conflicted."));
            }
            Client u = repository.insert(clientRecord);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> update(@Valid @RequestBody Client clientRecord, Authentication authentication) {
        try {
            Client u = repository.save(clientRecord);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @GetMapping("/deleteByID/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> deleteByID(@PathVariable("id") String id, Authentication authentication) {
        try {
            repository.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @GetMapping("/findByID/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OPERATOR')")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> findByID(@PathVariable("id") String id, Authentication authentication) {
        try {
            Optional<Client> u = repository.findById(id);
            return ResponseEntity.of(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @GetMapping("/findByIp")
    public ResponseEntity<?> findByIp(HttpServletRequest request) {
        try {
            Optional<Client> u = repository.findByIpAddress(Helper.getClientIpAddress(request));
            return ResponseEntity.of(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @PostMapping("/decreasePrintByIp")
    public ResponseEntity<?> decreasePrintByIp(HttpServletRequest request) {
        try {
            Optional<Client> client = repository.findByIpAddress(Helper.getClientIpAddress(request));
            if (client.isPresent()) {
                client.get().setInkCount(client.get().getInkCount() - 1);
                client.get().setPaperCount(client.get().getPaperCount() - 1);
                client.get().setReceiptCount(client.get().getReceiptCount() - 1);
                Client u = repository.save(client.get());
                return ResponseEntity.ok(u);
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_MODIFIED)
                        .body(new MessageResponse(HttpStatus.NOT_MODIFIED, "Not found"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @PostMapping("/increaseMoneyByIp")
    public ResponseEntity<?> increaseMoneyByIp(HttpServletRequest request) {
        try {
            Optional<Client> client = repository.findByIpAddress(Helper.getClientIpAddress(request));
            if (client.isPresent()) {
                client.get().setMoneyCount(client.get().getMoneyCount() + 1);
                Client u = repository.save(client.get());
                return ResponseEntity.ok(u);
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_MODIFIED)
                        .body(new MessageResponse(HttpStatus.NOT_MODIFIED, "Not found"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OPERATOR')")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> count(Authentication authentication) {
        try {
            return ResponseEntity.ok(repository.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED, e.getMessage()));
        }
    }

    @PostMapping("/list")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OPERATOR')")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<?> list(Authentication authentication, @RequestBody AppPageRequest p) {
        try {
            Page<Client> u = repository.findAll(PageRequest
                    .of(p.getPageNumber(), p.getPageSize(), Sort.by("id").descending())
            );
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_MODIFIED)
                    .body(new MessageResponse(HttpStatus.NOT_MODIFIED,e.getMessage()));
        }
    }

}
