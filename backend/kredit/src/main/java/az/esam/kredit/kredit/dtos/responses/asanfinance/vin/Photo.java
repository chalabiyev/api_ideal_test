package az.esam.kredit.kredit.dtos.responses.asanfinance.vin;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Photo {
    private String ImageType;
    private String ImageTypeDescription;
    private String ImageStream;
}
