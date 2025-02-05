package az.esam.kredit.kredit.services.external.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.AsanFinanceResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.farm.FarmInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.PersonalInfoAllResponse;
import az.esam.kredit.kredit.properties.AsanFinanceProperties;
import az.esam.kredit.kredit.services.external.SendRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@EnableConfigurationProperties(AsanFinanceProperties.class)
public class AsanFinanceServiceImpl implements AsanFinanceService {

    @Autowired
    AsanFinanceProperties asanFinanceProperties;

    @Autowired
    SendRequest sendRequest;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public AsanFinanceResponse<FarmInfoResponse> getFarmInfoByPin(String pin) {
        try {
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/FarmInfo/Pin/" + pin;
            log.info("getFarmInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey());
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, FarmInfoResponse.class)
                );
            } else {
                log.error("getFarmInfoByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<FarmInfoResponse> getFarmInfoByVoen(String voen) {
        try {
//            http://base-url/api/v1/FarmInfo/Voen/{voen}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/FarmInfo/Voen/" + voen;
            log.info("getFarmInfoByVoen Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey());
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, FarmInfoResponse.class)
                );
            } else {
                log.error("getFarmInfoByVoen Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoAllByPin(String pin) {
        try {
//            http://base-url/api/v1/PersonalInfo/All/{PIN}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/PersonalInfo/All/" + pin;
            log.info("getPersonalInfoAllByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey());
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, PersonalInfoAllResponse.class)
                );
            } else {
                log.error("getPersonalInfoAllByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoByPin(String pin) {
        try {
//            http://base-url/api/v1/PersonalInfo/{pin}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/PersonalInfo/" + pin;
            log.info("getPersonalInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey());
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, PersonalInfoAllResponse.class)
                );
            } else {
                log.error("getPersonalInfoByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<EmployeeInfoResponse> getEmployeeInfoByPin(String pin) {
        try {
//           http://base-url/api/v2/EmployeeInfo/{pin}
            String url = asanFinanceProperties.getApiUrl() + "/api/v2/EmployeeInfo/" + pin;
            log.info("getEmployeeInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey());
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, EmployeeInfoResponse.class)
                );
            } else {
                log.error("getEmployeeInfoByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<PensionerInfoResponse> getPensionerInfoByPin(String pin) {
        try {
//          http://base-url/api/v2/PensionInfo/{pin}
            String url = asanFinanceProperties.getApiUrl() + "/api/v2/PensionInfo/" + pin;
            log.info("getPensionerInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey());
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, PensionerInfoResponse.class)
                );
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
    public JsonNode getForeignPassportInfoByPin(String pin) {
        return null;
    }

    @Override
    public JsonNode getVinInfoByVin(String vin) {
        return null;
    }

    @Override
    public JsonNode getVoenInfoByVoen(String voen) {
        return null;
    }

    @Override
    public JsonNode getPersonalInfoByPinAndDocument(String pin, String documentNumber) {
        return null;
    }

    @Override
    public JsonNode getExpensesInfo() {
        return null;
    }

    @Override
    public JsonNode getPaymentsInfo() {
        return null;
    }

    @Override
    public JsonNode getBalanceInfo() {
        return null;
    }
}
