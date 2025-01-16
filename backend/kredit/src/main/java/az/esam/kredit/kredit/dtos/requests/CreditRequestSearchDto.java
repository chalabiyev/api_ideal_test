package az.esam.kredit.kredit.dtos.requests;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author cihan
 */
@Data
@Builder
public class CreditRequestSearchDto {

    private String creditType;
    private String confirmStatus;
    private String search;
    private int pageSize;
    private int page;
}
