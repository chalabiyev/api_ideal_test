package az.esam.kredit.kredit.services.internal.refresh;

import az.esam.kredit.kredit.repositories.asanfinance.AsanFinanceEmployeeInfoResponseRepository;
import az.esam.kredit.kredit.repositories.asanfinance.AsanFinancePensionerInfoResponseRepository;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.AsanFinanceResponse;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.VehicleInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.BlackListStatus;
import az.esam.kredit.kredit.services.external.SendRequest;
import az.esam.kredit.kredit.properties.AsanFinanceProperties;
import az.esam.kredit.kredit.dtos.enums.ESource;

import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.core.Authentication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.bson.Document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Service
public class RefreshServiceImpl implements RefreshService {

    @Value("${azinbridge.key}")
    private String authKey;
    @Value("${azinbridge.host}")
    private String host;

    private String authName = "X-Bridge-AuthorizationKey";

    @Autowired
    SendRequest sendRequest;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    AsanFinanceProperties asanFinanceProperties;

    @Autowired
    AsanFinanceEmployeeInfoResponseRepository employeeInfoAllResponseRepository;

    @Autowired
    AsanFinancePensionerInfoResponseRepository pensionerInfoAllResponseRepository;


    @Override
    public FullIDCardInfoResponse refreshPersonalInfo(String pin, String documentNumber, Authentication authentication) {
        try {
            String url = host + "iamas/document/getIdCardInfo?Pin=" + pin + "&DocumentNumber=" + documentNumber;
            log.info("Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", authName, authKey, false);

            if (jsonResponse != null) {
                try {
                    List<FullIDCardInfoResponse> idCardInfoList = objectMapper.readValue(
                            jsonResponse.get("data").toString(),
                            objectMapper.getTypeFactory().constructParametricType(List.class, FullIDCardInfoResponse.class)
                    );

                    if (idCardInfoList != null && !idCardInfoList.isEmpty()) {
                        FullIDCardInfoResponse idCardInfo = idCardInfoList.get(0);

                        mongoTemplate.save(idCardInfo);

                        Aggregation aggregation = Aggregation.newAggregation(
                                Aggregation.match(Criteria.where("nameAz").is(idCardInfo.getPersonAz().getName())),
                                Aggregation.project()
                                        .and(ConditionalOperators.Cond
                                                .when(Criteria.where("nameAz").is(idCardInfo.getPersonAz().getName()))
                                                .then(1)
                                                .otherwise(0)
                                        ).as("nameMatch")
                                        .and(ConditionalOperators.Cond
                                                .when(Criteria.where("surnameAz").is(idCardInfo.getPersonAz().getSurname()))
                                                .then(1)
                                                .otherwise(0)
                                        ).as("surnameMatch")
                                        .and(ConditionalOperators.Cond
                                                .when(Criteria.where("patronymicAz").is(idCardInfo.getPersonAz().getPatronymic()))
                                                .then(1)
                                                .otherwise(0)
                                        ).as("patronymicMatch")
                                        .and(ConditionalOperators.Cond
                                                .when(Criteria.where("dateOfBirth").is(idCardInfo.getBirthDate()))
                                                .then(1)
                                                .otherwise(0)
                                        ).as("birthDateMatch"),
                                Aggregation.addFields()
                                        .addField("totalMatches")
                                        .withValue(
                                                new Document("$add", List.of("$nameMatch", "$surnameMatch", "$patronymicMatch", "$birthDateMatch"))
                                        )
                                        .build()
                        );

                        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "blacklisted_individuals", Document.class);

                        for (Document doc : result) {
                            int total = doc.getInteger("totalMatches");
                            if (total == 4) {
                                idCardInfo.setBlackListStatus(BlackListStatus.builder()
                                        .matchCount(doc.getInteger("totalMatches"))
                                        .message("Şəxs siyahıda tapıldı")
                                        .build());
                                break;
                            }
                            if (total == 3) {
                                idCardInfo.setBlackListStatus(BlackListStatus.builder()
                                        .matchCount(doc.getInteger("totalMatches"))
                                        .message("Şəxs məlumatları 75% siyahıda tapıldı")
                                        .build());
                                break;
                            }
                        }

                        // Возвращаем данные
                        return idCardInfo;
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
    public String refreshAKBRequest(String pin, Authentication authentication) {
        // Implementation for refreshing AKB request
        return pin + " üçün AKB sorğusu yeniləndi";
    }

    @Override
    public EmployeeInfoResponse refreshEmployeeInfo(String pin, Authentication authentication) {
        try {
            String url = asanFinanceProperties.getApiUrl() + "/api/v2/EmployeeInfo/" + pin;
            log.info("getEmployeeInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<EmployeeInfoResponse> employeeInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                EmployeeInfoResponse.class));
                EmployeeInfoResponse employee = employeeInfoResponse.getResponse();
                if (employee != null) {
                    employee.setPin(pin);
                    employeeInfoAllResponseRepository.save(employee);
                    employee.setSource(ESource.SERVICE);
                    return employee;
                } else {
                    log.error("getEmployeeInfoByPin personInfoResponse Response is null or empty");
                }
            } else {
                log.error("getEmployeeInfoByPin personInfoResponse Response is null or empty");
            }
        } catch (Exception ex) {
            log.error("Error during getEmployeeInfoByPin execution: {}", ex.getMessage(), ex);
            return null;
        }
        return null;
    }

    @Override
    public PensionerInfoResponse refreshPensionerInfo(String pin, Authentication authentication) {
        try {
            String url = asanFinanceProperties.getApiUrl() + "/api/v2/PensionInfo/" + pin;
            log.info("getPensionerInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<PensionerInfoResponse> pensionerInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                PensionerInfoResponse.class));
                PensionerInfoResponse pensionerInfo = pensionerInfoResponse.getResponse();
                if (pensionerInfo != null) {
                    pensionerInfo.setPin(pin);
                    pensionerInfoAllResponseRepository.save(pensionerInfo);
                    pensionerInfo.setSource(ESource.SERVICE);
                    return pensionerInfo;
                } else {
                    log.error("getPensionerInfoByPin personInfoResponse Response is null or empty");
                }
            } else {
                log.error("getPensionerInfoByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<VehicleInfoResponse> refreshVehicleInfo(String pin, Authentication authentication) {
        try {
            String url = host + "general/vehicle/getVehicleInfoByPin?Pin=" + pin;
            log.info("Request URL: {}", url);
            JsonNode jsonNode = sendRequest.executeRequest(null, url, "GET", authName, authKey, false);

            if (jsonNode != null) {
                try {
                    List<VehicleInfoResponse> vehicleInfoResponseList = objectMapper.readValue(
                            jsonNode.get("data").toString(),
                            objectMapper.getTypeFactory().constructParametricType(List.class, VehicleInfoResponse.class)
                    );

                    if (vehicleInfoResponseList != null && !vehicleInfoResponseList.isEmpty()) {
                        mongoTemplate.insertAll(vehicleInfoResponseList);
                        return vehicleInfoResponseList;
                    }
                } catch (Exception e) {
                    log.error("Error parsing JSON response: {}", e.getMessage(), e);
                }
            } else {
                log.error("Response is null or empty");
            }
        } catch (Exception ex) {
            log.error("Error during getVehicleInfoByPin execution: {}", ex.getMessage(), ex);
            throw ex;
        }
        return null;
    }
}
