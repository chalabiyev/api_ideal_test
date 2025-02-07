package az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner;

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
@Document(collection = "asan_finance_pensioner_info_response")
public class PensionerInfoResponse {

    @Id
    private String pin;

    private String Name;
    private String Surname;
    private String Patronymic;
    private String BirthDate;
    private List<Allowance> Allowance;
    private List<Pension> Pension;
}
