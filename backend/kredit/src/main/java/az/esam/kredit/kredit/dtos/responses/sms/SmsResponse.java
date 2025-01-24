package az.esam.kredit.kredit.dtos.responses.sms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SmsResponse {

    @JsonProperty("Receiver")
    private String receiver;

    @JsonProperty("Charge")
    private int charge;

    @JsonProperty("MessageId") // Add this field
    private String messageId;
}
