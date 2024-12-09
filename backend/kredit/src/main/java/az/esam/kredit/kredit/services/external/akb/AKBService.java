package az.esam.kredit.kredit.services.external.akb;

import az.esam.kredit.kredit.services.external.akb.requests.AKBRequest;
import az.esam.kredit.kredit.services.external.akb.requests.UploadedInfoListRequest;
import az.esam.kredit.kredit.services.external.akb.requests.WrongInfoListRequest;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

public interface AKBService {

    JsonNode inquireByIdCard(AKBRequest akbRequest);

    JsonNode inquireByPassport(AKBRequest akbRequest);

    JsonNode inquireByServiceCard(AKBRequest akbRequest);

    JsonNode inquireByTaxNo(AKBRequest akbRequest);

    JsonNode inquireUtilityServices(String reportId);

    JsonNode getBorrowerScore(String reportId);

    JsonNode getBalance();

    JsonNode uploadArchivedXMLInfoZip(MultipartFile file);

    JsonNode getUploadedInfoStatus(String reportId);

    JsonNode getUploadedInfoList(UploadedInfoListRequest uploadedInfoListRequest);

    JsonNode getWrongInfoListForProcessedFiles(WrongInfoListRequest wrongInfoListRequest);

}
