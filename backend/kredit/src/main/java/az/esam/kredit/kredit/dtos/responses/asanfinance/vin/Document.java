package az.esam.kredit.kredit.dtos.responses.asanfinance.vin;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Document {
    private Long ID;
    private String Type;
    private String TypeDescription;
    private String Number;
    private String IssuingCountry;
    private String ExpiryDate;
    private List<Photo> Photos;

}
