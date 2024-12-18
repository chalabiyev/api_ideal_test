package az.esam.kredit.kredit.services.external.pdf;

import java.io.IOException;
import java.util.Map;

public interface PdfService {

    String loadHtmlContent(String templateName, Map<String, Object> data);

    byte[] generatePdf(String htmlContent) throws IOException;
}

