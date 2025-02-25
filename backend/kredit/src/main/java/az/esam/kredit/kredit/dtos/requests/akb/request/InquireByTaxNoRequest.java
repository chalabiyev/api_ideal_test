package az.esam.kredit.kredit.dtos.requests.akb.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InquireByTaxNoRequest {
    private String purposeCode;
    private Boolean accept;
    private String taxNo;
    private String org_id;
    private String branchId;
    private String userId;
}