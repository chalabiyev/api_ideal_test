package az.esam.kredit.kredit.services.external.pdf;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class PdfServiceImpl implements PdfService {

    @Override
    public String loadHtmlContent(String templateName, Map<String, Object> data) {
        // Configure Thymeleaf Template Resolver
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/"); // Directory where your templates are stored
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML");
        templateResolver.setCharacterEncoding("UTF-8");

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        // Create Thymeleaf context and set variables
        Context context = new Context();
        context.setVariables(data);

        // Process the template
        return templateEngine.process(templateName, context);
    }


    @Override
    public byte[] generatePdf(String htmlContent) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfRendererBuilder builder = new PdfRendererBuilder();

        // Configure the builder
        builder.useFastMode();
        builder.withHtmlContent(htmlContent, null); // HTML content
        builder.toStream(outputStream);

        // Build the PDF
        builder.run();
        return outputStream.toByteArray();
    }

//    String templateName = "sifaris-xett"; // Template name without the ".html" extension
//    Path outputFile = Path.of("/Users/aphar/Desktop/ideal-kredit/ideal_kredit/backend/kredit/uploads/output.pdf");
//
//    List<Spouse> spouses = List.of(
//            new Spouse("John Doe", "AA123456", "2023-01-01", "Gov. Authority",
//                    "New York", "USA", "123 Elm St", "456 Oak Ave",
//                    "123-456-7890", "Tech Company", "Manager", "Tech Street"),
//            new Spouse("Jane Smith", "BB654321", "2023-05-10", "Gov. Authority",
//                    "Los Angeles", "USA", "789 Pine St", "321 Maple Ave",
//                    "987-654-3210", "Finance Corp", "Analyst", "Finance Road")
//    );
//
//    Map<String, Object> data = Map.of(
//            "requestedUser", new Spouse("Alice Applicant", "CC987654", "2022-05-20", "Registrar",
//                    "Baku", "Azerbaijan", "Nizami St 10", "Xatai St 5",
//                    "051-123-4567", "Ideal Kredit", "Manager", "Ideal Office"),
//            "spouses", spouses, // Pass the list of spouses correctly
//            "factAddress", "Xatai St 5",
//            "countOfChildren", 2,
//            "education", "Bachelor's Degree",
//            "workPlace", "Ideal Kredit",
//            "workAddress", "Ideal Office",
//            "position", "Manager",
//            "salary", 2000,
//            "otherIncome", 500
//    );
}