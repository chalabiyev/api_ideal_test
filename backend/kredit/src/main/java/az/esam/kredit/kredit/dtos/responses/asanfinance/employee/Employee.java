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
    private String Name;
    private String Surname;
    private String Patronymic;
    private String Phone;
    private Type WorkPlaceType;
    private String WorkPlace;
    private String Position;
    private String PositionLabourContract;
    private Double Salary;
    private Type WorkCasualType;
    private String SSN;
}
