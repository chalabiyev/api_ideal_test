package az.esam.kredit.kredit.services.external.akb.uploadService;

import az.esam.kredit.kredit.properties.AkbProperties;
import az.esam.kredit.kredit.services.external.SendRequest;
import az.esam.kredit.kredit.dtos.requests.akb.uploads.UploadedInfoListRequest;
import az.esam.kredit.kredit.dtos.requests.akb.uploads.WrongInfoListRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;

@Slf4j
@Service
@EnableConfigurationProperties(AkbProperties.class)
public class AKBUploadInfoServiceImpl implements AKBUploadInfoService {

    @Autowired
    AkbProperties properties;

    @Autowired
    SendRequest sendRequest;

    private String authName = "Authorization";

    @Override
    public JsonNode uploadArchivedXMLInfoZip(MultipartFile file) {
        // Ensure the endpoint is correct
        final String uploadEndpoint = "api/v1/bcpm/batch/upload";
        String fullUrl = properties.getHost() + uploadEndpoint;

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file cannot be null or empty");
        }

        try {
            // Save the MultipartFile to a temporary file
            File tempFile = File.createTempFile("upload/", ".zip");
            file.transferTo(tempFile);

            // Send the request with the temporary file
            JsonNode response = sendRequest.sendPostRequestWithFile(fullUrl, Path.of(tempFile.getAbsolutePath()));

            // Clean up the temporary file after use
            if (tempFile.exists()) {
                tempFile.delete();
            }

            return response;
        } catch (Exception e) {
            log.error("Error occurred while uploading XML zip file to URL {}: {}", fullUrl, e.getMessage());
            throw new RuntimeException("Failed to upload XML zip file", e);
        }
    }


    @Override
    public JsonNode getUploadedInfoStatus(String reportId) {
        // Mövcud yüklənmiş məlumatların statusunun əldə edilməsi
        // api/v1/bcpm/batch/{batchId}
        String queryParams = "api/v1/bcpm/batch/" + reportId;
        // Combine the base URL with query parameters
        String fullUrl = properties.getHost() + queryParams;

        try {
            // Send the request
            return sendRequest.sendRequest(fullUrl, null, properties.getUpload_username(), properties.getUpload_password());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return null;
    }

    @Override
    public JsonNode getUploadedInfoList(UploadedInfoListRequest uploadedInfoListRequest) {
        //  Mövcud yüklənmiş məlumatların siyahısının alınması
//        http://app.acb.az:8002/api/v1/bcpm/batch?btcStatusLvl=&createdTime=2021-03-01,2021-03-
//        31&fileName=x%C9%99t&fileReportingDate=05%2F03%2F2021&page=0&size=10&sort=createdTime,desc
        String queryParams = "api/v1/bcpm/batch?btcStatusLvl=" + uploadedInfoListRequest.getBtcStatusLvl()
                + "&createdTime=" + uploadedInfoListRequest.getCreatedDate()
                + "&fileName=" + uploadedInfoListRequest.getFileName()
                + "&fileReportingDate=" + uploadedInfoListRequest.getFileReportingDate()
                + "&page=" + uploadedInfoListRequest.getPage()
                + "&size=" + uploadedInfoListRequest.getSize()
                + "&sort=" + uploadedInfoListRequest.getSort();

        // Combine the base URL with query parameters
        String fullUrl = properties.getHost() + queryParams;

        try {
            // Send the request
            return sendRequest.sendRequest(fullUrl, null, properties.getUpload_username(), properties.getUpload_password());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return null;
    }

    @Override
    public JsonNode getWrongInfoListForProcessedFiles(WrongInfoListRequest wrongInfoListRequest) {
        // Emalı bitmiş faylda səhv məlumatların siyahısı
//        http://app.acb.az:8002/api/v1/bcpm/batch/55909/logs?accountNo=XXXXXXXXXXXX&borrower
//        Id=AZEXXXXXX&page=0&size=10&sort=accountNo,asc&vlr=VLR-XXX

        // Query parameters
        String queryParams = "api/v1/bcpm/batch/" + wrongInfoListRequest.getBatchId()
                + "/logs?accountNo=" + wrongInfoListRequest.getAccountNo()
                + "&borrowerId=" + wrongInfoListRequest.getBorrowerId()
                + "&page=" + wrongInfoListRequest.getPage()
                + "&size=" + wrongInfoListRequest.getSize()
                + "&sort=" + wrongInfoListRequest.getSort()
                + "&vlr=" + wrongInfoListRequest.getVlr();

        // Combine the base URL with query parameters
        String fullUrl = properties.getHost() + queryParams;

        try {
            // Send the request
            return sendRequest.sendRequest(fullUrl, null, properties.getUpload_username(), properties.getUpload_password());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return null;
    }
}
