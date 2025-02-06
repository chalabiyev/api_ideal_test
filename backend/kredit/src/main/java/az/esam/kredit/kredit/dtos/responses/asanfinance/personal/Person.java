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
    private String Pin;
    private String LastName;
    private String FirstName;
    private String FatherName;
    private String BirthDate;
}
