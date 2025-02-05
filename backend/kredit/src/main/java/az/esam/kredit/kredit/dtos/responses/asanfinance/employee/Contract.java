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
    private String BeginDate;
    private String SignDate;
    private String InsertDate;
    private String EndDate;
    private String NextEndDate;
    private String TerminateDate;
    private Type PeriodType;
    private String Number;
    private Type Status;
    private Type Invalidation;
}