package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes;

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
public class AKBStatusResponse {
    private String code;
    private String name;
    private String status;
}