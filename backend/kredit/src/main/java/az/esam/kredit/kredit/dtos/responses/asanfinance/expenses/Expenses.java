package az.esam.kredit.kredit.dtos.responses.asanfinance.expenses;

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
public class Expenses {
    private String Value;
    private String Date;
    private String Service;
    private Double Amount;
    private String RequestIdentifier;
    private String IpAddress;
}
