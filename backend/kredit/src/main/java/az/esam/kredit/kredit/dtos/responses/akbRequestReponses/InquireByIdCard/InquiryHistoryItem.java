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
public class InquiryHistoryItem {
    private String inqOrgIDType;
    private String inqBankId;
    private String inqBankName;
    private String inqDate;
    private String inqPurposeId;
    private String inqType;
}
