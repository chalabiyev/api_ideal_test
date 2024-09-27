package az.esam.kredit.kredit.props;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "smsservice")
public class SMSServiceProperties {

    private String login;
    private String password;
    private String senderName;
    private String apiUrl;
    private String from;
}
