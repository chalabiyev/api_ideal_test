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
public class Employer {
    private String voen;
    private String name;
    private Integer workerCount;
    private String phone;
    private String legalAddress;
    private Type propertyType;
}