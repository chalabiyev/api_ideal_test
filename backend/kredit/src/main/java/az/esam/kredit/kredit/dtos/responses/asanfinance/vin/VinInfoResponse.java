package az.esam.kredit.kredit.dtos.responses.asanfinance.vin;

import az.esam.kredit.kredit.dtos.enums.ESource;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "asan-finance_vin_info")
public class VinInfoResponse {

    @Id
    private String vin;

    private String AppNumber;
    private String AttorneyNumber;
    private String AttorneyIssuingDate;
    private Person Person;
    private List<AsanFinanceDocument> Documents;

    private ESource source;
}