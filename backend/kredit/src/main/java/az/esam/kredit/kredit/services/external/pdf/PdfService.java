package az.esam.kredit.kredit.services.external.pdf;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public interface PdfService {

    String loadHtmlContent(String templateName, Map<String, Object> data);

    public byte[] mergePdfs(List<String> htmlContents, Path outputPath) throws IOException;

    byte[] generatePdf(String htmlContent) throws IOException;
}

