
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
public class ProtoInfo {

    @JsonProperty("Name")
    private String Name;
    @JsonProperty("Version")
    private String Version;
    
}
