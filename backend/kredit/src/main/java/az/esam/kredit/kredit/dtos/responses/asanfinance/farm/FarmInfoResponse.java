package az.esam.kredit.kredit.dtos.responses.asanfinance.farm;

import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.Person;
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
public class FarmInfoResponse {

    private Person person;

    private Company company;

    private List<Farm> farms;

}
