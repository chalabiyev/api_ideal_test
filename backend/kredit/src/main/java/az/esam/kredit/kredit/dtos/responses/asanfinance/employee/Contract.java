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
public class Contract {
    private String beginDate;
    private String signDate;
    private String insertDate;
    private String endDate;
    private String nextEndDate;
    private String terminateDate;
    private Type periodType;
    private String number;
    private Type status;
    private Type invalidation;
}