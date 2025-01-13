package az.esam.kredit.kredit.dtos.responses.sms;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SmsStatusResponse {

    @JsonProperty("MessageId")
    private String messageId;
    @JsonProperty("Receiver")
    private String receiver;
    @JsonProperty("SmsStatus")
    private String smsStatus;
    @JsonProperty("SmsStatusDescription")
    private String smsStatusDescription;
    @JsonProperty("IsFinalStatus")
    private String isFinalStatus;
    @JsonProperty("StatusTime")
    private String statusTime;
    @JsonProperty("SmsCharge")
    private String smsCharge;
}
