package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

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
public class InquireByIdCardResponse {
    private String reportId;
    private String reportingDate;
    private Borrower borrower;
    private Liabilities liabilities;
    private String coBorrowers;
    private String guarantee;
    private InquiryHistory inquiryHistory;
    private Score score;
    private Double balance;
    private String comments;
}
