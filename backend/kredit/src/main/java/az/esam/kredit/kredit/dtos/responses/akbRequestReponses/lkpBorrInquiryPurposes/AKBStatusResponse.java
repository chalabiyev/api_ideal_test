package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes;

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
@Document(collection = "akb_credit_status_type")
public class AKBStatusResponse {
    @Id
    private String id;

    private String code;
    private String name;
    private String status;
}