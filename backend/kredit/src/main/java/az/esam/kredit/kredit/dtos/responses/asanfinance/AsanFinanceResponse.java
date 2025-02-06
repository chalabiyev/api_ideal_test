package az.esam.kredit.kredit.dtos.responses.asanfinance;

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
public class AsanFinanceResponse<T> {
    private String requestIdentifier;
    private Status status;

    private T response;
}
