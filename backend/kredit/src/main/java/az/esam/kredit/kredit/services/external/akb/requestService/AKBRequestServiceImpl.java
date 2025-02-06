package az.esam.kredit.kredit.services.external.akb.requestService;

import az.esam.kredit.kredit.properties.AkbProperties;
import az.esam.kredit.kredit.services.external.SendRequest;
import az.esam.kredit.kredit.services.external.akb.requests.AKBRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import java.util.Base64;

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
    public JsonNode inquireByIdCard(AKBRequest akbRequest) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <inquireByIdCard xmlns=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "      <purposeCode>" + akbRequest.getPurposeCode() + "</purposeCode>\n" +
                    "      <accept>" + akbRequest.getAccept() + "</accept>\n" +
                    "      <documentSerial>" + akbRequest.getDocumentSerial() + "</documentSerial>\n" +
                    "      <documentNo>" + akbRequest.getDocumentNo() + "</documentNo>\n" +
                    "      <pinCode>" + akbRequest.getPinCode() + "</pinCode>\n" +
                    "      <orgId>" + akbRequest.getOrg_id() + "</orgId>\n" +
                    "      <branchId>" + akbRequest.getBranchId() + "</branchId>\n" +
                    "      <userId>" + akbRequest.getUserId() + "</userId>\n" +
                    "    </inquireByIdCard>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("inquireByIdCard Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
            if (jsonResponse != null) {
                return jsonResponse;
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
    public JsonNode inquireByPassport(AKBRequest akbRequest) {
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
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
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
    public JsonNode inquireByServiceCard(AKBRequest akbRequest) {
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
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
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
    public JsonNode inquireByTaxNo(AKBRequest akbRequest) {
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
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
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
    public JsonNode inquireUtilityServices(String reportId) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <inquireUtilityServices xmlns=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "      <reportId>" + reportId + "</reportId>\n" +
                    "    </inquireUtilityServices>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("inquireUtilityServices Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
            if (jsonResponse != null) {
                return jsonResponse;
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
    public JsonNode getBorrowerScore(String reportId) {
        try {
            String queryParams = "/services/BorrowerInquiryWS";
            String url = properties.getHost() + queryParams;
            String bodyStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                    "  <soap:Body>\n" +
                    "    <getBorrowerScore xmlns=\"http://inquiryws.mkr.risk.az/\">\n" +
                    "      <reportId>" + reportId + "</reportId>\n" +
                    "    </getBorrowerScore>\n" +
                    "  </soap:Body>\n" +
                    "</soap:Envelope>\n";

            log.info("getBorrowerScore Request URL: {}", url);
            String credentials = properties.getRequest_username() + ":" + properties.getRequest_password();
            String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
            if (jsonResponse != null) {
                return jsonResponse;
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
    public JsonNode getBalance() {
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
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", authName, encodedCredentials);
            if (jsonResponse != null) {
                return jsonResponse;
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
    public JsonNode getAppTransactionsByUsers() {
        return null;
    }

    @Override
    public JsonNode getWsTransactionsByUsers() {
        return null;
    }

    @Override
    public JsonNode inquireBakcellByIdCard() {
        return null;
    }

    @Override
    public JsonNode getAzerisiqData() {
        return null;
    }

    @Override
    public JsonNode inquireAzerisiqByIdCard() {
        return null;
    }

    @Override
    public JsonNode lkpBorrInquiryPurposes() {
        return null;
    }

    @Override
    public JsonNode lkpCollateralTypes() {
        return null;
    }

    @Override
    public JsonNode getAppTransactionsByBranches() {
        return null;
    }

    @Override
    public JsonNode getWsTransactionsByBranches() {
        return null;
    }

    @Override
    public JsonNode lkpCreditTypes() {
        return null;
    }
}
