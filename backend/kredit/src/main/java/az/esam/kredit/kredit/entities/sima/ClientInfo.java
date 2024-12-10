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
public class ClientInfo {

    @JsonProperty("ClientId")
    private long ClientId;
    @JsonProperty("IconURI")
    private String IconURI;
    @JsonProperty("Callback")
    private String Callback;
    @JsonProperty("ClientName")
    private String ClientName;        
    @JsonProperty("RedirectURI")
    private String RedirectURI;
    @JsonProperty("HostName")
    private String HostName;

}
