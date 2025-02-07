package az.esam.kredit.kredit.dtos.responses.asanfinance.farm;

import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.Person;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "asan_FarmInfoResponse")
public class FarmInfoResponse {

    @Id
    private String pin;

    @Indexed(unique = true)
    private String voen;

    private Person Person;

    private Company Company;

    private List<Farm> Farms;

}
