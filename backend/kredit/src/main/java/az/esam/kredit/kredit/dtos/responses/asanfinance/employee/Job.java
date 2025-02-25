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
public class Job {

    private Employer Employer;
    private Employee Employee;
    private Contract Contract;
}
