package az.esam.kredit.kredit.dtos.responses.asanfinance.farm;

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
public class Plant {
    private String Name;
    private Double FieldAmount;
    private String Unit;
}
