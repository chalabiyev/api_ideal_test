package az.esam.kredit.kredit.dtos.responses.asanfinance.voen;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.Type;
import az.esam.kredit.kredit.dtos.responses.asanfinance.vin.Person;
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
public class VoenInfoResponse {
    private Type payerType;
    private NaturalPerson naturalPerson;
    private LegalEntity legalEntity;
    private VoenInfo voenInfo;
    private Person chief;
}
