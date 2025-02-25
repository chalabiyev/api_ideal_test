package az.esam.kredit.kredit.services.external.akb.uploadService;

import az.esam.kredit.kredit.dtos.requests.akb.uploads.UploadedInfoListRequest;
import az.esam.kredit.kredit.dtos.requests.akb.uploads.WrongInfoListRequest;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

public interface AKBUploadInfoService {
    JsonNode uploadArchivedXMLInfoZip(MultipartFile file);

    JsonNode getUploadedInfoStatus(String reportId);

    JsonNode getUploadedInfoList(UploadedInfoListRequest uploadedInfoListRequest);

    JsonNode getWrongInfoListForProcessedFiles(WrongInfoListRequest wrongInfoListRequest);

}
