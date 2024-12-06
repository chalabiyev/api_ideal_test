package az.esam.kredit.kredit.entities.sima;

import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import java.util.Date;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author cihan
 */
@Builder
@Data
@Document(collection = "sima_encoded_contracts")
public class SimaEncodedContract {

    @Id
    private String id;
    private String encodedContract;
    private SimaContract simaContract;
    private String operationId;
    private ContractStatusEnum status;
    private Date createDate;
    private Date expDate;
    private Date signDate;
    private String signerIP;
    private String signerFin;
    private String signedHash;
    private String signerCert;
    private String dataSignature;
    private AuthenticationResponse tokenData;

}
