package az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.Type;
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
public class Pension {
    private Type Type;
    private String StartDate;
    private String EndDate;
    private Type Group;
    private Double Amount;
}
