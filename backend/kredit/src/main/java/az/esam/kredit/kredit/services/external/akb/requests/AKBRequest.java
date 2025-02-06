package az.esam.kredit.kredit.services.external.akb.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AKBRequest {
    private String purposeCode;
    private Boolean accept;
    private String taxNo;
    private String documentSerial;
    private String documentNo;
    private String countryISO3Code;
    private String pinCode;
    private String birthDate;
    private String org_id;
    private String branchId;
    private String userId;
}
