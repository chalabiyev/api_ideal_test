package az.esam.kredit.kredit.entities.sima;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

/**
 *
 * @author cihan
 */
@Data
@Builder
public class SignableContainer {

    @JsonProperty("ProtoInfo")
    private ProtoInfo ProtoInfo;
    @JsonProperty("OperationInfo")
    private OperationInfo OperationInfo;
    @JsonProperty("DataInfo")
    private DataInfo DataInfo;
    @JsonProperty("ClientInfo")
    private ClientInfo ClientInfo;

}
