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
@Document(collation = "sima_callbacks")
public class SimaCallBack {

    private ContractTypeEnum Type;
    private String OperationId;
    private String DataSignature;
    private String SignedDataHash;
    private String AlgName;

}
