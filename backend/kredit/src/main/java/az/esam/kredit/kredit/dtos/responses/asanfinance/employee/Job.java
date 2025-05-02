package az.esam.kredit.kredit.dtos.responses.asanfinance.employee;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JsonProperty("Employer")
    private Employer Employer;
    @JsonProperty("Employee")
    private Employee Employee;
    @JsonProperty("Contract")
    private Contract Contract;
}
