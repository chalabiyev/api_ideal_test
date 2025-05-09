package az.esam.kredit.kredit.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.ZoneId;
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
import az.esam.kredit.kredit.helper.FIDFCalculator;
import az.esam.kredit.kredit.repositories.UploadedFileRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.services.excel.ExcelParseService;
import az.esam.kredit.kredit.services.excel.ExcelService;
import az.esam.kredit.kredit.services.external.pdf.PdfService;
import az.esam.kredit.kredit.utility.CreditCalculation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = { "*" }, maxAge = 3600)
@RestController
@Validated
@Slf4j
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

        @Autowired
        ExcelParseService excelParseService;

        @Autowired
        ExcelService excelService;

        static final Map termCommisionRateMap = Map.of(
                        3, 7.0,
                        6, 12,
                        9, 16.0,
                        12, 20.0,
                        15, 23.0,
                        18, 25.6,
                        24, 28.55);

        @PreAuthorize("hasRole('ADMIN')")
        @SecurityRequirement(name = "authentication")
        @SecurityRequirement(name = "X-API-KEY")
        @PostMapping("/generateA")
        public ResponseEntity<Map<String, String>> generateA(@RequestBody CreditRequest request) throws IOException {
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
                request.setCommissionRate(
                                termCommisionRateMap.containsKey(request.getCreditTerm())
                                                ? (Double) termCommisionRateMap.get(request.getCreditTerm())
                                                : 0);

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

                List<Double> paymentList = new ArrayList<>();
                List<LocalDate> dateList = new ArrayList<>();

                // Örneğin her ay için eşit taksit varsa...
                LocalDate startDate = request.getRequestDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                for (int i = 0; i < request.getCreditTerm(); i++) {
                        paymentList.add(monthlyPayment);
                        dateList.add(startDate.plusMonths(i + 1));
                }

                Double[] payments = paymentList.toArray(new Double[0]);
                LocalDate[] dates = dateList.toArray(new LocalDate[0]);

                request.setCalculatedFIFD(
                                FIDFCalculator.calculateFIDF(request.getAmountToBePaid(), payments, dates, startDate));

                List<String> htmlContents = new ArrayList<>(List.of(
                                pdfService.loadHtmlContent("firstpage", request.toMap()),
                                pdfService.loadHtmlContent("page_2", request.toMap()),
                                pdfService.loadHtmlContent("m-formasi", request.toMap()),
                                pdfService.loadHtmlContent("erize-xett", request.toMap()),
                                pdfService.loadHtmlContent("sifaris-xett", request.toMap()),
                                pdfService.loadHtmlContent(
                                                request.getPartner() != null ? "xett-partner" : "xett",
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

        @PreAuthorize("hasRole('ADMIN')")
        @SecurityRequirement(name = "authentication")
        @SecurityRequirement(name = "X-API-KEY")
        @PostMapping("/generate")
        public ResponseEntity<Map<String, String>> generate(@RequestBody CreditRequest request) throws Exception {
                if (request.getRequestDate() == null) {
                        request.setRequestDate(new Date());
                }
                if (request.getRequestedUser() == null) {
                        return ResponseEntity.badRequest().build();
                }
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                        Files.createDirectories(uploadDir);
                }

                String uuid = UUID.randomUUID().toString();
                String excelName = uuid + ".xlsx";
                Path excelPath = Paths.get(uploadDir.toString(), excelName);
                String tmpPdfName = uuid + "_tmp.pdf";
                Path tmpPdfPath = Paths.get(uploadDir.toString(), tmpPdfName);
                String pdfName = uuid + ".pdf";
                Path pdfPath = Paths.get(uploadDir.toString(), pdfName);

                // double monthlyPayment = creditCalculation.calculateMonthlyPayment(
                // request.getCreditAmount(),
                // request.getAnnualPercent(),
                // request.getCreditTerm());
                // request.setMonthlyPayment(monthlyPayment);
                // List<PaymentTableContent> creditPayment =
                // creditCalculation.calculatePaymentTable(
                // request.getId(),
                // request.getCreditAmount(),
                // request.getAnnualPercent(),
                // request.getCreditTerm());
                // double totalPayment = monthlyPayment * request.getCreditTerm();
                // double totalInterest = Math.round((totalPayment - request.getCreditAmount())
                // * 100.0) / 100.0;
                // request.setCommissionRate(
                // termCommisionRateMap.containsKey(request.getCreditTerm())
                // ? (Double) termCommisionRateMap.get(request.getCreditTerm())
                // : 0);

                // PPTransEntity ppTransEntity = PPTransEntity.builder()
                // .date(request.getConfirmDate())
                // .creditAmount(request.getCreditAmount())
                // .interestRate(request.getAnnualPercent())
                // .creditTerm(request.getCreditTerm())
                // .monthlyPayment(request.getMonthlyPayment())
                // .userPin(request.getRequestedUser().getPin())
                // .userSerialNumber(request.getRequestedUser().getSeriaNo())
                // .userFullName(request.getRequestedUser().getFullName())
                // .birthDate(request.getRequestedUser().getBirthDate())
                // .totalPayment(totalPayment)
                // .totalInterest(totalInterest)
                // .paymentTableContents(creditPayment)
                // .build();

                boolean parseResult = excelParseService.parseExcel(excelPath, request);
                if (!parseResult) {
                        throw new Exception("Excel parse error");
                }
                boolean convertResult = excelService.convertToPdf(excelPath.toString(),
                                tmpPdfPath.toString(),
                                pdfPath.toString(),
                                request.getGuarantors() == null ? 0 : request.getGuarantors().size());
                if (!convertResult) {
                        throw new Exception("Pdf convert error");
                }
                Files.delete(tmpPdfPath);

                uploadedFileRepository.save(UploadedFile.builder()
                                .fileName(pdfName)
                                .upladedDate(new Date())
                                .owner(request.getRequestedUser())
                                .build());
                uploadedFileRepository.save(UploadedFile.builder()
                                .fileName(excelName)
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
