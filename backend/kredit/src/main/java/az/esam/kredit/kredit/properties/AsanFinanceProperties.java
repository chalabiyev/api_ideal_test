package az.esam.kredit.kredit.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "asanfinance")
@Data
public class AsanFinanceProperties {
    private String apiUrl;
    private String apiKey;
}
