package az.esam.kredit.kredit.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "smsservice")
public class SMSServiceProperties {

    private String username;
    private String password;
    private String apiUrl;
    private String from;
}
