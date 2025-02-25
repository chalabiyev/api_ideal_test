package az.esam.kredit.kredit.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "golden-pay")
@Data
public class GoldenPayProperties {
    private String apiUrl;
    private String authKey;
    private String merchantName;
    private String paymentUrl;
}
