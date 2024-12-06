package az.esam.kredit.kredit.entities.sima;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

/**
 *
 * @author cihan
 */
@Builder
@Data
public class SimaContract {

    @JsonProperty("SignableContainer")
    private SignableContainer SignableContainer;
    @JsonProperty("Header")
    private Header Header;
}
