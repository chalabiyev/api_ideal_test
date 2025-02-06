package az.esam.kredit.kredit.dtos.requests.akb.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InquireByIdCardRequest {
    private String purposeCode;
    private Boolean accept;
    private String documentSerial;
    private String documentNo;
    private String pinCode;
    private String org_id;
    private String branchId;
    private String userId;
}
