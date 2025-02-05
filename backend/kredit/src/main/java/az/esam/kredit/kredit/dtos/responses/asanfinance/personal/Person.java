package az.esam.kredit.kredit.dtos.responses.asanfinance.personal;

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
public class Person {
    private String pin;
    private String lastName;
    private String firstName;
    private String fatherName;
    private String birthDate;
}
