package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.Spouse;
import az.esam.kredit.kredit.services.external.pdf.PdfService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/contract")
public class ContractController {

    @Autowired
    PdfService pdfService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/generate")
    public ResponseEntity<Map<String, String>> generate(@RequestBody CreditRequest request) throws IOException {
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        String pdfName = UUID.randomUUID().toString() + ".pdf";
        Path path = Paths.get(uploadDir.toString(), pdfName);

        List<String> htmlContents = new ArrayList<>(List.of(
                pdfService.loadHtmlContent("m-formasi", request.toMap()),
                pdfService.loadHtmlContent("erize-xett", request.toMap()),
                pdfService.loadHtmlContent("sifaris-xett", request.toMap()),
                pdfService.loadHtmlContent("xett", request.toMap()),
                pdfService.loadHtmlContent("trans", request.toMap()),
                pdfService.loadHtmlContent("erize-trans", request.toMap()),
                pdfService.loadHtmlContent("tehlil-trans", request.toMap()),
                pdfService.loadHtmlContent("tt-kart", request.toMap())
        ));

        // Add content for each spouse with index
        List<Spouse> spouses = request.getSpouses();
        for (int i = 0; i < spouses.size(); i++) {
            Spouse spouse = spouses.get(i);
            Map<String, Object> objectMap = request.toMap();
            objectMap.put("spouse", spouse);
            htmlContents.add(pdfService.loadHtmlContent("zamin", objectMap));
        }

        byte[] mergedPdf = pdfService.mergePdfs(htmlContents, path);

        // Save to file or return as a response
        Files.write(path, mergedPdf);
        return ResponseEntity.ok(Map.of("pdfName", pdfName, "status", "success"));
    }
}
