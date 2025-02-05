package az.esam.kredit.kredit.dtos.responses.asanfinance.farm;

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
public class Field {
    private String VillageName;
    private String DocType;
    private Double FieldAmount;
    private String Unit;
    private List<Plant> Plants;
}
