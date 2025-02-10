package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.Campaign;
import az.esam.kredit.kredit.patch.Patcher;
import az.esam.kredit.kredit.repositories.content_management.CampaignRepository;
import az.esam.kredit.kredit.services.internal.campaign.CampaignService;
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
@RequestMapping("/api/campaign")
class CampaignController {

    @Autowired
    CampaignService campaignService;

    @Autowired
    CampaignRepository campaignRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<Campaign> create(@RequestBody Campaign request) {
        return ResponseEntity.ok(campaignService.add(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Campaign> patch(@PathVariable String id, @RequestBody Map<String, Object> patch) throws IllegalAccessException {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kampaniya tapılmadı"));
        patcher.patcher(campaign, patch);
        return ResponseEntity.ok(campaignService.update(campaign));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<Campaign> update(@RequestBody Campaign request) {
        return ResponseEntity.ok(campaignService.update(request));
    }

    @GetMapping("/get")
    public ResponseEntity<Campaign> getById(@RequestParam String id) {
        return ResponseEntity.ok(campaignService.get(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Campaign>> list() {
        return ResponseEntity.ok(campaignService.list());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id) {
        return ResponseEntity.ok(campaignService.delete(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/changeShow")
    public ResponseEntity<Campaign> show(@RequestParam String id) {
        return ResponseEntity.ok(campaignService.changeDisplayOnHome(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/listHomeCampaigns")
    public ResponseEntity<List<Campaign>> listHomeCampaigns() {
        return ResponseEntity.ok(campaignService.listHomeCampaigns());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(campaignService.count());
    }
}
