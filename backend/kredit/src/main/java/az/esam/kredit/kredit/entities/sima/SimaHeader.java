
package az.esam.kredit.kredit.entities.sima;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author cihan
 */
@Data
@Builder
@Document(collation = "sima_headers")
public class SimaHeader {

    private String tsSignAlg;
    private String tsCert;
    private String tsSign;
    private String finCode;
    
}
