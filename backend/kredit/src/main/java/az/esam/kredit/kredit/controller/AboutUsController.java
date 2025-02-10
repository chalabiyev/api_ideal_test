package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.AboutUs;
import az.esam.kredit.kredit.services.internal.about.AboutUsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/about-us")
public class AboutUsController {

    @Autowired
    AboutUsService aboutUsService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<AboutUs> create(@RequestBody AboutUs request) {
        return ResponseEntity.ok(aboutUsService.add(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<AboutUs> update(@RequestBody AboutUs request) {
        return ResponseEntity.ok(aboutUsService.update(request));
    }

    @GetMapping("/get")
    public ResponseEntity<AboutUs> getById(@RequestParam String id) {
        return ResponseEntity.ok(aboutUsService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<AboutUs>> list() {
        return ResponseEntity.ok(aboutUsService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(aboutUsService.delete(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(aboutUsService.count());
    }
}
