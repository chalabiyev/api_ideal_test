package az.esam.kredit.kredit.entities.sima;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Builder;
import lombok.Data;

/**
 *
 * @author cihan
 */
@Data
@Builder
public class OperationInfo {

    @JsonProperty("Type")
    private ContractTypeEnum Type;
    @JsonProperty("OperationId")
    private String OperationId;
    @JsonProperty("NbfUTC")
    private long NbfUTC;
    @JsonProperty("ExpUTC")
    private long ExpUTC;
    @JsonProperty("Assignee")
    private List<String> Assignee;

}
