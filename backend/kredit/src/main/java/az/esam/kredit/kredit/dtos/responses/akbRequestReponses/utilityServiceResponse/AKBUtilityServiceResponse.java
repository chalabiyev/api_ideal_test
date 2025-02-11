package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.utilityServiceResponse;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard.Borrower;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "akb_utilityServiceResponses")
public class AKBUtilityServiceResponse {
    @Id
    private String reportId;
    private String dateOfReport;
    private Borrower borrower;
    private Utility azersu;
    private Utility azeriqaz;
    private Utility azerisiq;

}
