package az.esam.kredit.kredit.dtos.responses.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PassportDetail {
    private String documentType;
    private String documentNumber;
    private Date expDate;
    private String issuingCountry;
    private Date issuingDate;
    @JsonProperty("isActive")
    private boolean isActive;
}
