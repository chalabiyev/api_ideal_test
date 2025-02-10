package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.content_management.Subscriber;
import az.esam.kredit.kredit.dtos.requests.SubscribeRequest;
import az.esam.kredit.kredit.services.internal.subscriber.SubscribeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/subscribe")
class SubscribeController {

    @Autowired
    SubscribeService subscribeService;

    @PostMapping("/subscribe")
    public ResponseEntity<Boolean> subscribe(@RequestBody SubscribeRequest request) throws BadRequestException {
        return ResponseEntity.ok(subscribeService.subscribe(request));
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<Boolean> unsubscribe(@RequestBody SubscribeRequest request) throws BadRequestException {
        return ResponseEntity.ok(subscribeService.unsubscribe(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/send-campaign")
    public ResponseEntity<Boolean> sendCampaignEmail(@RequestParam String campaignId) {
        return ResponseEntity.ok(subscribeService.sendCampaignEmail(campaignId));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Subscriber>> list() {
        return ResponseEntity.ok(subscribeService.list());
    }
}
