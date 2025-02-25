package az.esam.kredit.kredit.dtos.responses.asanfinance.voen;

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
public class VoenInfo {
    private String VOEN;
    private String CreateDate;
    private String LastUpdateDate;
    private String State;
    private String StateDescription;
}
