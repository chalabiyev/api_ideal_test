package az.esam.kredit.kredit.entities.sima;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author cihan
 */
@Data
@Builder
public class SimaQRResponse {
    
    private String image;    
    private String operationId;
    private String tsQueryUrl;

}
