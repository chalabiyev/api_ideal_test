package az.esam.kredit.kredit.dtos.responses.asanfinance.employee;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String pin;

    private List<Job> Active;

    private List<Job> Deactive;
}