package az.esam.kredit.kredit.services.external.asanfinance;

import az.esam.kredit.kredit.dtos.requests.asanfinance.AsanFinanceRequest;
import az.esam.kredit.kredit.dtos.responses.asanfinance.AsanFinanceResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.balance.BalanceInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.expenses.ExpensesResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.farm.FarmInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.passport.PassportInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.payment.PaymentInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.PersonalInfoAllResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.vin.VinInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.voen.VoenInfoResponse;
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
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
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
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
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
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
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
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
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
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
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
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
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
    public AsanFinanceResponse<PassportInfoResponse> getForeignPassportInfoByPin(String pin) {
        try {
//         http://base-url/api/v1/ForeignPassportInfo/{pin}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/ForeignPassportInfo/" + pin;
            log.info("getForeignPassportInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, PassportInfoResponse.class)
                );
            } else {
                log.error("getForeignPassportInfoByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<VinInfoResponse> getVinInfoByVin(String vin) {
        try {
//         http://base-url/api/v1/VINInfo/{VIN}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/VINInfo/" + vin;
            log.info("getVinInfoByVin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, VinInfoResponse.class)
                );
            } else {
                log.error("getVinInfoByVin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<VoenInfoResponse> getVoenInfoByVoen(String voen) {
        try {
//          http://base-url/api/v1/VoenInfo/{VOEN}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/VoenInfo/" + voen;
            log.info("getVoenInfoByVoen Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, VoenInfoResponse.class)
                );
            } else {
                log.error("getVoenInfoByVoen Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoByPinAndDocument(String pin, String documentNumber) {
        try {
//          http://base-url/api/v1/PersonalInfo/PinAndDocNumber?pin={pin}&docNumber={docNumber}
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/PersonalInfo/PinAndDocNumber?pin=" + pin + "&docNumber=" + documentNumber;
            log.info("getPersonalInfoByPinAndDocument Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, PersonalInfoAllResponse.class)
                );
            } else {
                log.error("getPersonalInfoByPinAndDocument Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<ExpensesResponse> getExpensesInfo(AsanFinanceRequest asanFinanceRequest) {
        try {
//          http://base-url/api/v1/Info/Expenses
            String bodyStr = objectMapper.writeValueAsString(asanFinanceRequest);
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/Info/Expenses";
            log.info("getExpensesInfo Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, ExpensesResponse.class)
                );
            } else {
                log.error("getExpensesInfo Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<PaymentInfoResponse> getPaymentsInfo(AsanFinanceRequest asanFinanceRequest) {
        try {
//          http://base-url/api/v1/Info/Payments
            String bodyStr = objectMapper.writeValueAsString(asanFinanceRequest);
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/Info/Payments";
            log.info("getPaymentsInfo Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, PaymentInfoResponse.class)
                );
            } else {
                log.error("getPaymentsInfo Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public AsanFinanceResponse<BalanceInfoResponse> getBalanceInfo(AsanFinanceRequest asanFinanceRequest) {
        try {
//          http://base-url/api/v1/Info/Balance
            String bodyStr = objectMapper.writeValueAsString(asanFinanceRequest);
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/Info/Balance";
            log.info("getBalanceInfo Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", "ApiKey", asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class, BalanceInfoResponse.class)
                );
            } else {
                log.error("getBalanceInfo Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }
}
