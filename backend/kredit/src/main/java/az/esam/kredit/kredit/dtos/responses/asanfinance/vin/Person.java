package az.esam.kredit.kredit.dtos.responses.asanfinance.vin;

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
public class Person {
    private String Nationality;
    private String LivingCountry;
    private String Name;
    private String Surname;
    private String Patronymic;
    private String BirthDate;
    private String Gender;
    private List<Photo> Photos;
}
