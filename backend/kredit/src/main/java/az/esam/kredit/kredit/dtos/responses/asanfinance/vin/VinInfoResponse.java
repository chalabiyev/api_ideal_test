package az.esam.kredit.kredit.dtos.responses.asanfinance.vin;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VinInfoResponse {
    private String AppNumber;
    private String AttorneyNumber;
    private String AttorneyIssuingDate;
    private Person Person;
    private List<Document> Documents;
}