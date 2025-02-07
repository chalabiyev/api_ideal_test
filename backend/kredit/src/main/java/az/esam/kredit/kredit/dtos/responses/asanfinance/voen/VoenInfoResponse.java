package az.esam.kredit.kredit.dtos.responses.asanfinance.voen;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.Type;
import az.esam.kredit.kredit.dtos.responses.asanfinance.vin.Person;
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
@Document(collection = "asan-finance_voen_info")
public class VoenInfoResponse {
    @Id
    private String voen;

    private Type payerType;
    private NaturalPerson naturalPerson;
    private LegalEntity legalEntity;
    private VoenInfo voenInfo;
    private Person chief;
}
