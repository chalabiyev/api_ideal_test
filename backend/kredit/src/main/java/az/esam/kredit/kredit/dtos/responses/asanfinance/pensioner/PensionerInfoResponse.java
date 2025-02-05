package az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner;

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
public class PensionerInfoResponse {
    private String name;
    private String surname;
    private String patronymic;
    private String birthDate;
    private List<Allowance> allowance;
    private List<Pension> pension;
}
