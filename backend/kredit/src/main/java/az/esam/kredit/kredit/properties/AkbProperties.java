package az.esam.kredit.kredit.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "akb")
@Data
public class AkbProperties {
    private String host;

    private String request_username;
    private String request_password;

    private String upload_username;
    private String upload_password;
}
