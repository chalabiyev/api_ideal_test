package az.esam.kredit.kredit.dtos.responses.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDetail {
    private String address;
    private String flat;
    private String house;
    private String village;
    private String settlement;
    private String regionName;
    private String street;
    private String territorial;
    private String district;
}
