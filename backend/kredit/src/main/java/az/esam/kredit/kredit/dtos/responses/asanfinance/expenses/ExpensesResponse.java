package az.esam.kredit.kredit.dtos.responses.asanfinance.expenses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExpensesResponse {
    private List<Expenses> Expenses;
    private Integer Count;
}
