package az.esam.kredit.kredit.dtos.responses.asanfinance.voen;

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
public class LegalEntity {
    private String FullName;
    private String LegalAddress;
    private List<String> FactualAddress;
}
