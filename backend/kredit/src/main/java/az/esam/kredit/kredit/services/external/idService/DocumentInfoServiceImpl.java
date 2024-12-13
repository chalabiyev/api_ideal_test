package az.esam.kredit.kredit.services.external.idService;

import az.esam.kredit.kredit.dtos.responses.document.*;
import az.esam.kredit.kredit.services.external.JsonParserService;
import az.esam.kredit.kredit.services.external.SendRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class DocumentInfoServiceImpl implements DocumentInfoService {

    @Autowired
    SendRequest sendRequest;

    @Value("${azinbridge.key}")
    private String authKey;

    @Value("${azinbridge.host}")
    private String host;

    private String authName = "X-Bridge-AuthorizationKey";

    @Autowired
    JsonParserService parserService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public FullIDCardInfoResponse getIdCardInfo(String documentNumber, String pin) throws IOException {
        try {
            String url = "iamas/document/getIdCardInfo?Pin=" + pin + "&DocumentNumber=" + documentNumber;
            log.info("Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonResponse != null) {
                try {
                    List<FullIDCardInfoResponse> idCardInfoList =
                            parserService.parseResponse(jsonResponse, FullIDCardInfoResponse.class);

                    if (idCardInfoList != null && !idCardInfoList.isEmpty()) {
                        // check if person is on the blacklistedIndividuals
                        Aggregation aggregation = Aggregation.newAggregation(
                                Aggregation.match(Criteria.where("nameAz").is(idCardInfoList.get(0).getPersonAz().getName())),
                                Aggregation.project()
                                        .andExpression("nameAz == @nameAz ? 1 : 0").as("nameMatch")
                                        .andExpression("surnameAz == @surnameAz ? 1 : 0").as("surnameMatch")
                                        .andExpression("patronymicAz == @patronymicAz ? 1 : 0").as("patronymicMatch")
                                        .andExpression("dateOfBirth == @dateOfBirth ? 1 : 0").as("birthDateMatch")
                                        .andExpression("nameMatch + surnameMatch + patronymicMatch + birthDateMatch").as("totalMatches")
                        );
                        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "blacklisted_individuals", Document.class);

                        for (Document doc : result) {
                            int total = doc.getInteger("totalMatches");
                            if (total == 4) {
                                idCardInfoList.get(0).setBlackListStatus(BlackListStatus.builder()
                                        .matchCount(doc.getInteger("totalMatches"))
                                        .message("Şəxs siyahıda tapıldı")
                                        .build());
                                break;
                            }
                            if (total == 3) {
                                idCardInfoList.get(0).setBlackListStatus(BlackListStatus.builder()
                                        .matchCount(doc.getInteger("totalMatches"))
                                        .message("Şəxs məlumatları 75% siyahıda tapıldı")
                                        .build());
                                break;
                            }
                        }

                        return idCardInfoList.get(0);
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);

                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error("Error during getIdCardInfo execution: {}", ex.getMessage(), ex);
            throw ex;
        }
        return null;
    }

    @Override
    public List<MobileNumberResponse> getMobileNumbersWithPin(String pin) {
        try {
            String url = "mobile/numbers/getmobileNumbersWithPin?Pin=" + pin;
            log.info("Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonResponse != null) {
                try {
                    List<MobileNumberResponse> mobileNumberResponseList =
                            parserService.parseResponse(jsonResponse, MobileNumberResponse.class);

                    if (mobileNumberResponseList != null && !mobileNumberResponseList.isEmpty()) {
                        return mobileNumberResponseList;
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return new ArrayList<>();
    }

    @Override
    public CheckNumberWithPinResponse getCheckNumberWithPin(String pin, String number) {
        try {
            String url = "mobile/numbers/getCheckNumberWithPin?phone=" + number + "&Pin=" + pin;
            JsonNode jsonNode = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonNode != null) {
                try {
                    List<Integer> checkNumberWithPinResponseList = parserService.parseResponse(jsonNode, Integer.class);

                    if (checkNumberWithPinResponseList != null && !checkNumberWithPinResponseList.isEmpty()) {
                        switch (checkNumberWithPinResponseList.get(0)) {
                            case 1:
                                return CheckNumberWithPinResponse.builder()
                                        .data(1)
                                        .message("Məlumat doğrudur")
                                        .build();
                            case 2:
                                return CheckNumberWithPinResponse.builder()
                                        .data(2)
                                        .message("Məlumat yanlışdır")
                                        .build();
                            case 3:
                                return CheckNumberWithPinResponse.builder()
                                        .data(3)
                                        .message("Qeyd olunan nömrə ilə bağlı məlumat tapılmadı")
                                        .build();
                        }
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public DocumentInfoByMobileNumberResponse getDocumentInfoByPhone(String phoneNumber) throws IOException {
        try {
            String url = "mobile/numbers/getDocumentInfoByPhone?phone=" + phoneNumber;
            JsonNode jsonNode = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonNode != null) {
                try {
                    List<DocumentInfoByMobileNumberResponse> documentInfoByMobileNumberResponseList =
                            parserService.parseResponse(jsonNode, DocumentInfoByMobileNumberResponse.class);

                    if (documentInfoByMobileNumberResponseList != null && !documentInfoByMobileNumberResponseList.isEmpty()) {
                        return documentInfoByMobileNumberResponseList.get(0);
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            throw ex;
        }
        return null;
    }

    @Override
    public List<VehicleInfoResponse> getVehicleInfoByPin(String pin) throws IOException {
        try {
            String url = "general/vehicle/getVehicleInfoByPin?Pin=" + pin;
            JsonNode jsonNode = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonNode != null) {
                try {
                    List<VehicleInfoResponse> vehicleInfoResponseList =
                            parserService.parseResponse(jsonNode, VehicleInfoResponse.class);

                    if (vehicleInfoResponseList != null && !vehicleInfoResponseList.isEmpty()) {
                        return vehicleInfoResponseList;
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            throw ex;
        }
        return null;
    }

    @Override
    public MigrationDocumentInfoResponse getMigrationInfo(String migrationDocNumber, String migrationPin) {
        try {
            String url = "iamas/document/getMigrationInfo?MigrationDocNumber=" + migrationDocNumber
                    + "&MigrationPin=" + migrationPin;
            JsonNode jsonNode = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonNode != null) {
                try {
                    List<MigrationDocumentInfoResponse> migrationDocumentInfoResponseList =
                            parserService.parseResponse(jsonNode, MigrationDocumentInfoResponse.class);

                    if (migrationDocumentInfoResponseList != null && !migrationDocumentInfoResponseList.isEmpty()) {
                        return migrationDocumentInfoResponseList.get(0);
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public PassportDocumentInfoResponse getPassportInfo(String foreignDocNumber, String foreignPin) {
        try {
            String url = "iamas/document/getPassportInfo?ForeignDocNumber=" + foreignDocNumber
                    + "&ForeignPin=" + foreignPin;
            JsonNode jsonNode = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonNode != null) {
                try {
                    List<PassportDocumentInfoResponse> passportDocumentInfoResponseList =
                            parserService.parseResponse(jsonNode, PassportDocumentInfoResponse.class);

                    if (passportDocumentInfoResponseList != null && !passportDocumentInfoResponseList.isEmpty()) {
                        return passportDocumentInfoResponseList.get(0);
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public VoenInfoResponse getInfoByVoen(String voen) {
        try {
            String url = "general/etaxes/getInfoByVoen?Voen=" + voen;
            JsonNode jsonNode = sendRequest.executeRequest(url, authName, authKey, host);
            if (jsonNode != null) {
                try {
                    List<VoenInfoResponse> voenInfoResponseList =
                            parserService.parseResponse(jsonNode, VoenInfoResponse.class);

                    if (voenInfoResponseList != null && !voenInfoResponseList.isEmpty()) {
                        return voenInfoResponseList.get(0);
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

}

