package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.utilityServiceResponse;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard.Borrower;
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
public class AKBUtilityServiceResponse {
    private String reportId;
    private String dateOfReport;
    private Borrower borrower;
    private Utility azersu;
    private Utility azeriqaz;
    private Utility azerisiq;

}
