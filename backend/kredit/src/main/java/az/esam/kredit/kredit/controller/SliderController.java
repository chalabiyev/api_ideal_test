package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.Slider;
import az.esam.kredit.kredit.services.internal.slider.SliderService;
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
@RequestMapping("/api/slider")
public class SliderController {

    @Autowired
    SliderService sliderService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<Slider> create(@RequestBody Slider request) {
        return ResponseEntity.ok(sliderService.add(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<Slider> update(@RequestBody Slider request) {
        return ResponseEntity.ok(sliderService.update(request));
    }

    @GetMapping("/get")
    public ResponseEntity<Slider> getById(@RequestParam String id) {
        return ResponseEntity.ok(sliderService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Slider>> list() {
        return ResponseEntity.ok(sliderService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(sliderService.delete(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(sliderService.count());
    }
}
