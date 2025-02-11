package az.esam.kredit.kredit.services.external.akb.requestService;

import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByIdCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByPassportRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByServiceCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByTaxNoRequest;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard.InquireByIdCardResponse;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.*;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.utilityServiceResponse.AKBUtilityServiceResponse;
import az.esam.kredit.kredit.properties.AkbProperties;
import az.esam.kredit.kredit.services.external.SendRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

import static az.esam.kredit.kredit.services.external.SendRequest.objectMapper;

@Slf4j
@Service
@EnableConfigurationProperties(AkbProperties.class)
public class AKBRequestServiceImpl implements AKBRequestService {

    @Autowired
    AkbProperties properties;

    @Autowired
    SendRequest sendRequest;

    private String authName = "Authorization";

    @Override
    public InquireByIdCardResponse inquireByIdCard(InquireByIdCardRequest akbRequest) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:inq=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "    <soapenv:Header/>\n" +
                    "    <soapenv:Body>\n" +
                    "        <inq:inquireByIdCard>\n" +
                    "           <purposeCode>" + akbRequest.getPurposeCode() + "</purposeCode>\n" +
                    "           <accept>" + akbRequest.getAccept() + "</accept>\n" +
                    "           <documentSerial>AZE</documentSerial>\n" +
                    "           <documentNo>" + akbRequest.getDocumentNo() + "</documentNo>\n" +
                    "           <pinCode>" + akbRequest.getPinCode() + "</pinCode>\n" +
                    "           <orgId>" + akbRequest.getOrg_id() + "</orgId>\n" +
                    "           <branchId>" + akbRequest.getBranchId() + "</branchId>\n" +
                    "           <userId>" + akbRequest.getUserId() + "</userId>\n" +
                    "        </inq:inquireByIdCard>\n" +
                    "    </soapenv:Body>\n" +
                    "</soapenv:Envelope>";

            log.info("inquireByIdCard Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("inquireByIdCardResponse").get("return"));
                return objectMapper.readValue(jsonString, InquireByIdCardResponse.class);
            } else {
                log.error("inquireByIdCard Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public JsonNode inquireByPassport(InquireByPassportRequest akbRequest) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <inquireByPassport xmlns=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "      <purposeCode>" + akbRequest.getPurposeCode() + "</purposeCode>\n" +
                    "      <accept>" + akbRequest.getAccept() + "</accept>\n" +
                    "      <countryISO3Code>" + akbRequest.getCountryISO3Code() + "</countryISO3Code>\n" +
                    "      <documentNo>" + akbRequest.getDocumentNo() + "</documentNo>\n" +
                    "      <orgId>" + akbRequest.getOrg_id() + "</orgId>\n" +
                    "      <branchId>" + akbRequest.getBranchId() + "</branchId>\n" +
                    "      <userId>" + akbRequest.getUserId() + "</userId>\n" +
                    "    </inquireByPassport>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("inquireByPassport Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                return jsonResponse;
            } else {
                log.error("inquireByPassport Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public JsonNode inquireByServiceCard(InquireByServiceCardRequest akbRequest) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <inquireByServiceCard xmlns=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "      <purposeCode>" + akbRequest.getPurposeCode() + "</purposeCode>\n" +
                    "      <accept>" + akbRequest.getAccept() + "</accept>\n" +
                    "      <documentSerial>" + akbRequest.getDocumentSerial() + "</documentSerial>\n" +
                    "      <documentNo>" + akbRequest.getDocumentNo() + "</documentNo>\n" +
                    "      <birthDate>" + akbRequest.getBirthDate() + "</birthDate>\n" +
                    "      <orgId>" + akbRequest.getOrg_id() + "</orgId>\n" +
                    "      <branchId>" + akbRequest.getBranchId() + "</branchId>\n" +
                    "      <userId>" + akbRequest.getUserId() + "</userId>\n" +
                    "    </inquireByServiceCard>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("inquireByServiceCard Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                return jsonResponse;
            } else {
                log.error("inquireByServiceCard Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public JsonNode inquireByTaxNo(InquireByTaxNoRequest akbRequest) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <inquireByTaxNo xmlns=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "      <purposeCode>" + akbRequest.getPurposeCode() + "</purposeCode>\n" +
                    "      <accept>" + akbRequest.getAccept() + "</accept>\n" +
                    "      <taxNo>" + akbRequest.getTaxNo() + "</taxNo>\n" +
                    "      <orgId>" + akbRequest.getOrg_id() + "</orgId>\n" +
                    "      <branchId>" + akbRequest.getBranchId() + "</branchId>\n" +
                    "      <userId>" + akbRequest.getUserId() + "</userId>\n" +
                    "    </inquireByTaxNo>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("inquireByTaxNo Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                return jsonResponse;
            } else {
                log.error("inquireByTaxNo Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AKBUtilityServiceResponse inquireUtilityServices(String reportId) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:inq=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "   <soapenv:Header/>\n" +
                    "   <soapenv:Body>\n" +
                    "      <inq:inquireUtilityServices>\n" +
                    "         <reportId>" + reportId + "</reportId>\n" +
                    "      </inq:inquireUtilityServices>\n" +
                    "   </soapenv:Body>\n" +
                    "</soapenv:Envelope>";

            log.info("inquireUtilityServices Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("inquireUtilityServicesResponse").get("return"));
                return objectMapper.readValue(jsonString, AKBUtilityServiceResponse.class);
            } else {
                log.error("inquireUtilityServices Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AKBBorrowerScoreResponse getBorrowerScore(String reportId) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:inq=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "   <soapenv:Header/>\n" +
                    "   <soapenv:Body>\n" +
                    "      <inq:getBorrowerScore>\n" +
                    "         <reportId>" + reportId + "</reportId>\n" +
                    "      </inq:getBorrowerScore>\n" +
                    "   </soapenv:Body>\n" +
                    "</soapenv:Envelope>\n";

            log.info("getBorrowerScore Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("getBorrowerScoreResponse").get("return"));
                return objectMapper.readValue(jsonString, AKBBorrowerScoreResponse.class);
            } else {
                log.error("getBorrowerScore Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public Double getBalance() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <getBalance xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("getBalanceInfo Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("getBalanceResponse").get("return"));
                return objectMapper.readValue(jsonString, Double.class);
            } else {
                log.error("getBalanceInfo Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBTypeResponse> lkpBorrInquiryPurposes() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpBorrInquiryPurposes xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpBorrInquiryPurposes Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpBorrInquiryPurposesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBTypeResponse.class)
                );
            } else {
                log.error("lkpBorrInquiryPurposes Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBTypeResponse> lkpCollateralTypes() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCollateralTypes xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCollateralTypes Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCollateralTypesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBTypeResponse.class)
                );
            } else {
                log.error("lkpCollateralTypes Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBTypeResponse> lkpCountries() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCountries xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCountries Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCountriesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBTypeResponse.class)
                );
            } else {
                log.error("lkpCountries Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBTypeResponse> lkpCreditClassTypes() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCreditClassTypes xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCreditClassTypes Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCreditClassTypesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBTypeResponse.class)
                );
            } else {
                log.error("lkpCreditClassTypes Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBTypeResponse> lkpCreditPurposeTypes() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCreditPurposeTypes xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCreditPurposeTypes Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCreditPurposeTypesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBTypeResponse.class)
                );
            } else {
                log.error("lkpCreditPurposeTypes Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBStatusResponse> lkpCreditStatusTypes() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCreditStatusTypes xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCreditStatusTypes Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCreditStatusTypesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBStatusResponse.class)
                );
            } else {
                log.error("lkpCreditStatusTypes Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBCreditTypeResponse> lkpCreditTypes() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCreditTypes xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCreditTypes Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCreditTypesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBCreditTypeResponse.class)
                );
            } else {
                log.error("lkpCreditTypes Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public List<AKBCurrencyResponse> lkpCurrencies() {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <lkpCurrencies xmlns=\"http://inquiryws.mkr.risk.az/\"/>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("lkpCurrencies Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials, true);
            if (jsonResponse != null) {
                String jsonString = objectMapper.writeValueAsString(jsonResponse.get("Body").get("lkpCurrenciesResponse").get("return"));
                return objectMapper.readValue(
                        jsonString,
                        objectMapper.getTypeFactory().constructParametricType(List.class, AKBCurrencyResponse.class)
                );
            } else {
                log.error("lkpCurrencies Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }
}
