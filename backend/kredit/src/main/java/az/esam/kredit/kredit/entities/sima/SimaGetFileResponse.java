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
public class SimaGetFileResponse {

    @JsonProperty("filename")
    private String filename;
    @JsonProperty("data")
    private String data;

}
