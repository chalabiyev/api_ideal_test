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
public class Header {

    @JsonProperty("AlgName")
    private String AlgName;
    @JsonProperty("Signature")
    private String Signature;

}
