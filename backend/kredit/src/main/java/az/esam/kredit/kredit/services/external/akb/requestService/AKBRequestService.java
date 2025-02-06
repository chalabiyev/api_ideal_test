package az.esam.kredit.kredit.services.external.akb.requestService;

import az.esam.kredit.kredit.services.external.akb.requests.AKBRequest;
import az.esam.kredit.kredit.services.external.akb.requests.UploadedInfoListRequest;
import az.esam.kredit.kredit.services.external.akb.requests.WrongInfoListRequest;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

public interface AKBRequestService {

    JsonNode inquireByIdCard(AKBRequest akbRequest);

    JsonNode inquireByPassport(AKBRequest akbRequest);

    JsonNode inquireByServiceCard(AKBRequest akbRequest);

    JsonNode inquireByTaxNo(AKBRequest akbRequest);

    JsonNode inquireUtilityServices(String reportId);

    JsonNode getBorrowerScore(String reportId);

    JsonNode getBalance();

    JsonNode getAppTransactionsByUsers();

    JsonNode getWsTransactionsByUsers();

    JsonNode inquireBakcellByIdCard();

    JsonNode getAzerisiqData();

    JsonNode inquireAzerisiqByIdCard();

    JsonNode lkpBorrInquiryPurposes();

    JsonNode lkpCollateralTypes();

    JsonNode getAppTransactionsByBranches();

    JsonNode getWsTransactionsByBranches();

    JsonNode lkpCreditTypes();


}
