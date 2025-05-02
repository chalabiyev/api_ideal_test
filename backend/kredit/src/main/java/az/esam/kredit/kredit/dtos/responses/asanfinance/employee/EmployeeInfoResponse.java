package az.esam.kredit.kredit.dtos.responses.asanfinance.employee;

import az.esam.kredit.kredit.dtos.enums.ESource;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "asan_finance_employee_info_response")
public class EmployeeInfoResponse {

    @Id
    @JsonProperty("Pin")
    private String Pin;
    @JsonProperty("Active")
    private List<Job> Active;
    @JsonProperty("Deactive")
    private List<Job> Deactive;

    @JsonProperty("Source")
    private ESource Source;
}