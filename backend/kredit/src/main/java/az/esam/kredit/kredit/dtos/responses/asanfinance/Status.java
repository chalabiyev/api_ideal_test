package az.esam.kredit.kredit.dtos.responses.asanfinance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Status {
    @JsonProperty("Name")
    private String Name;
    @JsonProperty("Code")
    private String Code;
    @JsonProperty("Message")
    private String Message;
}
