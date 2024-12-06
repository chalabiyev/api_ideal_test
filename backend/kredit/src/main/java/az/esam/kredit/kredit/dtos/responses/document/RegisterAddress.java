package az.esam.kredit.kredit.dtos.responses.document;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterAddress {
    private String flat;
    private String house;
    private int regionId;
    private String regionName;
    private String street;
}
