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
public class Farm {
    private Long Id;
    private String Name;
    private List<Field> Fields;
    private List<Animal> Animals;
    private List<Animal> Bees;
}
