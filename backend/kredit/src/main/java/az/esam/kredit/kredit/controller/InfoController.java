package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.Info;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.content_management.InfoRepository;
import az.esam.kredit.kredit.services.internal.info.InfoService;
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
@RequestMapping("/api/content/info")
public class InfoController {

    @Autowired
    InfoService infoService;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<Info> create(@RequestBody Info request) {
        return ResponseEntity.ok(infoService.add(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Info> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        Info info = infoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Məlumat tapılmadı"));
        patcher.patcher(info, patch);
        return ResponseEntity.ok(infoService.update(info));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<Info> update(@RequestBody Info request) {
        return ResponseEntity.ok(infoService.update(request));
    }

    @GetMapping("/get")
    public ResponseEntity<Info> getById(@RequestParam String id) {
        return ResponseEntity.ok(infoService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Info>> list() {
        return ResponseEntity.ok(infoService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(infoService.delete(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(infoService.count());
    }
}
