package az.esam.kredit.kredit.dtos.responses.asanfinance.employee;

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
public class Employee {
    private String name;
    private String surname;
    private String patronymic;
    private String phone;
    private Type workPlaceType;
    private String workPlace;
    private String position;
    private String positionLabourContract;
    private Double salary;
    private Type workCasualType;
    private String ssn;
}
