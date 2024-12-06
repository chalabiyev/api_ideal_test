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
public class DataInfo {

    @JsonProperty("DataURI")
    private String DataURI;
    
    @JsonProperty("AlgName")
    private String AlgName;
    
    @JsonProperty("FingerPrint")
    private String FingerPrint;

}
