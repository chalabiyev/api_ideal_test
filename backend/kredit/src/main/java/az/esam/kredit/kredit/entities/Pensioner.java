package az.esam.kredit.kredit.entities;

import java.util.List;

import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.Allowance;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.Pension;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Pensioner {

    private String name;
    private String patronymic;
    private String birthDate;
    private String surname;
    private List<Allowance> allowance;
    private List<Pension> pension;

}
