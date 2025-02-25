package az.esam.kredit.kredit.dtos.requests.akb.uploads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class WrongInfoListRequest {
    private String batchId;
    private String page;
    private String size;
    private String sort;

    private String accountNo;
    private String borrowerId;
    private String vlr;
}
