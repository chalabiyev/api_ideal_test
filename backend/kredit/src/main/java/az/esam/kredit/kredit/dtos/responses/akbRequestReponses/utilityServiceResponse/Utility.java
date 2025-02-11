package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.utilityServiceResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Utility {
    private Boolean fault;
    private String errorMessage;
    private String errorHrMessage;
    private String providerName;
    private String providerId;
    private String reportingDate;
    private String documentNo;
    private String documentType;
}

