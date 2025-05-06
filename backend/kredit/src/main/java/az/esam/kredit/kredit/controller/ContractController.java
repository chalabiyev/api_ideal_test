package az.esam.kredit.kredit.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.PPTransEntity;
import az.esam.kredit.kredit.entities.PaymentTableContent;
import az.esam.kredit.kredit.entities.Spouse;
import az.esam.kredit.kredit.entities.UploadedFile;
import az.esam.kredit.kredit.repositories.UploadedFileRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.services.external.pdf.PdfService;
import az.esam.kredit.kredit.utility.CreditCalculation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = { "*" }, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/contract")
public class ContractController {

        @Autowired
        PdfService pdfService;

        @Autowired
        ObjectMapper om;

        @Autowired
        AuthenticationService authenticationService;

        @Autowired
        UploadedFileRepository uploadedFileRepository;

        @Autowired
        CreditCalculation creditCalculation;

        @PreAuthorize("hasRole('ADMIN')")
        @SecurityRequirement(name = "authentication")
        @SecurityRequirement(name = "X-API-KEY")
        @PostMapping("/generate")
        public ResponseEntity<Map<String, String>> generate(@RequestBody CreditRequest request) throws IOException {
                if (request.getRequestedUser() == null) {
                        return ResponseEntity.badRequest().build();
                }
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                        Files.createDirectories(uploadDir);
                }
                String pdfName = UUID.randomUUID().toString() + ".pdf";
                Path path = Paths.get(uploadDir.toString(), pdfName);

                double monthlyPayment = creditCalculation.calculateMonthlyPayment(
                                request.getCreditAmount(),
                                request.getAnnualPercent(),
                                request.getCreditTerm());
                request.setMonthlyPayment(monthlyPayment);
                List<PaymentTableContent> creditPayment = creditCalculation.calculatePaymentTable(
                                request.getId(),
                                request.getCreditAmount(),
                                request.getAnnualPercent(),
                                request.getCreditTerm());
                double totalPayment = monthlyPayment * request.getCreditTerm();
                double totalInterest = Math.round((totalPayment - request.getCreditAmount()) * 100.0) / 100.0;

                PPTransEntity ppTransEntity = PPTransEntity.builder()
                                .date(request.getConfirmDate())
                                .creditAmount(request.getCreditAmount())
                                .interestRate(request.getAnnualPercent())
                                .creditTerm(request.getCreditTerm())
                                .monthlyPayment(request.getMonthlyPayment())
                                .userPin(request.getRequestedUser().getPin())
                                .userSerialNumber(request.getRequestedUser().getSeriaNo())
                                .userFullName(request.getRequestedUser().getFullName())
                                .birthDate(request.getRequestedUser().getBirthDate())
                                .totalPayment(totalPayment)
                                .totalInterest(totalInterest)
                                .paymentTableContents(creditPayment)
                                .build();

                List<String> htmlContents = new ArrayList<>(List.of(
                                pdfService.loadHtmlContent("firstpage", request.toMap()),
                                pdfService.loadHtmlContent("page_2", request.toMap()),
                                pdfService.loadHtmlContent("m-formasi", request.toMap()),
                                pdfService.loadHtmlContent("erize-xett", request.toMap()),
                                pdfService.loadHtmlContent("sifaris-xett", request.toMap()),
                                pdfService.loadHtmlContent(request.getPartner() != null ? "xett-partner" : "xett",
                                                request.toMap()),
                                pdfService.loadHtmlContent("trans", request.toMap()),
                                pdfService.loadHtmlContent("tehlil-trans", request.toMap()),
                                pdfService.loadHtmlContent("pp-trans", ppTransEntity.toMap()),
                                pdfService.loadHtmlContent("page_6", request.toMap()),
                                pdfService.loadHtmlContent("page_7", request.toMap())));

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
                uploadedFileRepository.save(UploadedFile.builder()
                                .fileName(pdfName)
                                .upladedDate(new Date())
                                .owner(request.getRequestedUser())
                                .build());
                return ResponseEntity.ok(Map.of("pdfName", pdfName, "status", "success"));
        }

        @GetMapping("calculate")
        public void calculate() throws IOException {
                double monthlyPayment = creditCalculation.calculateMonthlyPayment(
                                5000,
                                10,
                                12);
                List<PaymentTableContent> creditPayment = creditCalculation.calculatePaymentTable(
                                "lsdkjflkdsjfksldf",
                                5000,
                                10,
                                12);
                double totalPayment = monthlyPayment * 12;
                double totalInterest = Math.round((totalPayment - 5000) * 100.0) / 100.0;

                PPTransEntity ppTransEntity = PPTransEntity.builder()
                                .date(new Date())
                                .creditAmount(5000)
                                .interestRate(10)
                                .creditTerm(12)
                                .monthlyPayment(monthlyPayment)
                                .userPin("kdflmnkdlf")
                                .userSerialNumber("dkfnldf")
                                .userFullName("dkfnjldf")
                                .birthDate(new Date())
                                .totalPayment(totalPayment)
                                .totalInterest(totalInterest)
                                .paymentTableContents(creditPayment)
                                .build();

                System.out.println("Monthly Payment: " + monthlyPayment);
                System.out.println("Total interest " + totalInterest);
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                        Files.createDirectories(uploadDir);
                }
                String pdfName = UUID.randomUUID().toString() + ".pdf";
                Path path = Paths.get(uploadDir.toString(), pdfName);

                List<String> htmlContents = new ArrayList<>(List.of(
                                pdfService.loadHtmlContent("pp-trans", ppTransEntity.toMap())));

                byte[] mergedPdf = pdfService.mergePdfs(htmlContents, path);

                // Save to file or return as a response
                Files.write(path, mergedPdf);
                uploadedFileRepository.save(UploadedFile.builder()
                                .fileName(pdfName)
                                .upladedDate(new Date())
                                .build());

        }
}
