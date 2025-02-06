package az.esam.kredit.kredit.dtos.requests.akb.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InquireByServiceCardRequest {
    private String purposeCode;
    private Boolean accept;
    private String documentSerial;
    private String documentNo;
    private String birthDate;
    private String org_id;
    private String branchId;
    private String userId;
}