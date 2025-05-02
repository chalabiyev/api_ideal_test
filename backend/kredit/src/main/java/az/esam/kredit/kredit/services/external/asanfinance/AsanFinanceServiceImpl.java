package az.esam.kredit.kredit.services.external.asanfinance;

import az.esam.kredit.kredit.dtos.enums.ESource;
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
import az.esam.kredit.kredit.repositories.asanfinance.*;
import az.esam.kredit.kredit.services.external.SendRequest;
import jakarta.annotation.PostConstruct;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MapperFeature;
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
    AsanFinanceFarmInfoResponseRepository farmInfoResponseRepository;

    @Autowired
    AsanFinancePersonalInfoAllResponseRepository personalInfoAllResponseRepository;

    @Autowired
    AsanFinanceEmployeeInfoResponseRepository employeeInfoAllResponseRepository;

    @Autowired
    AsanFinancePensionerInfoResponseRepository pensionerInfoAllResponseRepository;

    @Autowired
    AsanFinancePassportInfoResponseRepository asanFinancePassportInfoResponseRepository;

    @Autowired
    AsanFinanceVinInfoResponseRepository vinInfoResponseRepository;

    @Autowired
    AsanFinanceVoenInfoResponseRepository voenInfoResponseRepository;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init() {
        objectMapper.enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES);
    }

    @Override
    public FarmInfoResponse getFarmInfoByPin(String pin, boolean fetchFromService) {
        try {
            if (!fetchFromService && farmInfoResponseRepository.findByPin(pin).isPresent()) {
                FarmInfoResponse farmInfoResponse = farmInfoResponseRepository.findByPin(pin).get();
                farmInfoResponse.setSource(ESource.DB);
                return farmInfoResponse;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/FarmInfo/Pin/" + pin;
            log.info("getFarmInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<FarmInfoResponse> farmInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                FarmInfoResponse.class));

                FarmInfoResponse farmInfo = farmInfoResponse.getResponse();
                if (farmInfo != null) {
                    farmInfo.setPin(pin);
                    farmInfoResponseRepository.save(farmInfo);
                    farmInfo.setSource(ESource.SERVICE);
                    return farmInfo;
                } else {
                    log.error("getFarmInfoByPin farmInfoResponse Response is null or empty");
                }
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
    public FarmInfoResponse getFarmInfoByVoen(String voen, boolean fetchFromService) {
        try {
            if (!fetchFromService && farmInfoResponseRepository.findByVoen(voen).isPresent()) {
                FarmInfoResponse farmInfoResponse = farmInfoResponseRepository.findByVoen(voen).get();
                farmInfoResponse.setSource(ESource.DB);
                return farmInfoResponse;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/FarmInfo/Voen/" + voen;
            log.info("getFarmInfoByVoen Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<FarmInfoResponse> farmInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                FarmInfoResponse.class));

                FarmInfoResponse farmInfo = farmInfoResponse.getResponse();
                if (farmInfo != null) {
                    farmInfo.setVoen(voen);
                    farmInfoResponseRepository.save(farmInfo);
                    farmInfo.setSource(ESource.SERVICE);
                    return farmInfo;
                } else {
                    log.error("getFarmInfoByVoen farmInfoResponse Response is null or empty");
                }
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
    public PersonalInfoAllResponse getPersonalInfoAllByPin(String pin, boolean fetchFromService) {
        try {
            if (!fetchFromService && personalInfoAllResponseRepository.findByPIN(pin).isPresent()) {
                PersonalInfoAllResponse response = personalInfoAllResponseRepository.findByPIN(pin).get();
                response.setSource(ESource.DB);
                return response;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/PersonalInfo/All/" + pin;
            log.info("getPersonalInfoAllByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<PersonalInfoAllResponse> personInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                PersonalInfoAllResponse.class));
                PersonalInfoAllResponse personInfo = personInfoResponse.getResponse();
                if (personInfo != null) {
                    personInfo.setPIN(pin);
                    personalInfoAllResponseRepository.save(personInfo);
                    personInfo.setSource(ESource.SERVICE);
                    return personInfo;
                } else {
                    log.error("getPersonalInfoAllByPin personInfoResponse Response is null or empty");
                }
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
    public PersonalInfoAllResponse getPersonalInfoByPin(String pin, boolean fetchFromService) {
        try {
            if (!fetchFromService && personalInfoAllResponseRepository.findByPIN(pin).isPresent()) {
                PersonalInfoAllResponse response = personalInfoAllResponseRepository.findByPIN(pin).get();
                response.setSource(ESource.DB);
                return response;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/PersonalInfo/" + pin;
            log.info("getPersonalInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<PersonalInfoAllResponse> personInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                PersonalInfoAllResponse.class));
                PersonalInfoAllResponse personInfo = personInfoResponse.getResponse();
                if (personInfo != null) {
                    personInfo.setPIN(pin);
                    personalInfoAllResponseRepository.save(personInfo);
                    personInfo.setSource(ESource.SERVICE);
                    return personInfo;
                } else {
                    log.error("getPersonalInfoByPin personInfoResponse Response is null or empty");
                }
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
    public EmployeeInfoResponse getEmployeeInfoByPin(String pin, boolean fetchFromService) {
        try {
            if (!fetchFromService && employeeInfoAllResponseRepository.findByPin(pin).isPresent()) {
                EmployeeInfoResponse response = employeeInfoAllResponseRepository.findByPin(pin).get();
                response.setSource(ESource.DB);
                return response;
            }
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
                log.error("getEmployeeInfoByPin Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public PensionerInfoResponse getPensionerInfoByPin(String pin, boolean fetchFromService) {
        try {
            if (!fetchFromService && pensionerInfoAllResponseRepository.findByPin(pin).isPresent()) {
                PensionerInfoResponse response = pensionerInfoAllResponseRepository.findByPin(pin).get();
                response.setSource(ESource.DB);
                return response;
            }
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
    public PassportInfoResponse getForeignPassportInfoByPin(String pin, boolean fetchFromService) {
        try {
            if (!fetchFromService && asanFinancePassportInfoResponseRepository.findByPIN(pin).isPresent()) {
                PassportInfoResponse response = asanFinancePassportInfoResponseRepository.findByPIN(pin).get();
                response.setSource(ESource.DB);
                return response;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/ForeignPassportInfo/" + pin;
            log.info("getForeignPassportInfoByPin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<PassportInfoResponse> passportInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                PassportInfoResponse.class));
                PassportInfoResponse passportInfo = passportInfoResponse.getResponse();
                if (passportInfo != null) {
                    passportInfo.setPIN(pin);
                    asanFinancePassportInfoResponseRepository.save(passportInfo);
                    passportInfo.setSource(ESource.SERVICE);
                    return passportInfo;
                } else {
                    log.error("getForeignPassportInfoByPin personInfoResponse Response is null or empty");
                }
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
    public VinInfoResponse getVinInfoByVin(String vin, boolean fetchFromService) {
        try {
            if (!fetchFromService && vinInfoResponseRepository.findByVin(vin).isPresent()) {
                VinInfoResponse response = vinInfoResponseRepository.findByVin(vin).get();
                response.setSource(ESource.DB);
                return response;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/VINInfo/" + vin;
            log.info("getVinInfoByVin Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<VinInfoResponse> vinInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                VinInfoResponse.class));
                VinInfoResponse vinInfo = vinInfoResponse.getResponse();
                if (vinInfo != null) {
                    vinInfo.setVin(vin);
                    vinInfoResponseRepository.save(vinInfo);
                    vinInfo.setSource(ESource.SERVICE);
                    return vinInfo;
                } else {
                    log.error("getVinInfoByVin personInfoResponse Response is null or empty");
                }
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
    public VoenInfoResponse getVoenInfoByVoen(String voen, boolean fetchFromService) {
        try {
            if (!fetchFromService && voenInfoResponseRepository.findByVoen(voen).isPresent()) {
                VoenInfoResponse response = voenInfoResponseRepository.findByVoen(voen).get();
                response.setSource(ESource.DB);
                return response;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/VoenInfo/" + voen;
            log.info("getVoenInfoByVoen Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<VoenInfoResponse> voenInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                VoenInfoResponse.class));
                VoenInfoResponse voenInfo = voenInfoResponse.getResponse();
                if (voenInfo != null) {
                    voenInfo.setVoen(voen);
                    voenInfoResponseRepository.save(voenInfo);
                    voenInfo.setSource(ESource.SERVICE);
                    return voenInfo;
                } else {
                    log.error("getVoenInfoByVoen personInfoResponse Response is null or empty");
                }
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
    public PersonalInfoAllResponse getPersonalInfoByPinAndDocument(String pin, String documentNumber,
            boolean fetchFromService) {
        try {
            if (!fetchFromService && personalInfoAllResponseRepository.findByPIN(pin).isPresent()) {
                PersonalInfoAllResponse response = personalInfoAllResponseRepository.findByPIN(pin).get();
                response.setSource(ESource.DB);
                return response;
            }
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/PersonalInfo/PinAndDocNumber?pin=" + pin
                    + "&docNumber=" + documentNumber;
            log.info("getPersonalInfoByPinAndDocument Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "GET", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                AsanFinanceResponse<PersonalInfoAllResponse> personInfoResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                PersonalInfoAllResponse.class));
                PersonalInfoAllResponse personInfo = personInfoResponse.getResponse();
                if (personInfo != null) {
                    personInfo.setPIN(pin);
                    personalInfoAllResponseRepository.save(personInfo);
                    personInfo.setSource(ESource.SERVICE);
                    return personInfo;
                } else {
                    log.error("getPersonalInfoByPinAndDocument personInfoResponse Response is null or empty");
                }
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
            // http://base-url/api/v1/Info/Expenses
            String bodyStr = objectMapper.writeValueAsString(asanFinanceRequest);
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/Info/Expenses";
            log.info("getExpensesInfo Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                ExpensesResponse.class));
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
            // http://base-url/api/v1/Info/Payments
            String bodyStr = objectMapper.writeValueAsString(asanFinanceRequest);
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/Info/Payments";
            log.info("getPaymentsInfo Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                PaymentInfoResponse.class));
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
            // http://base-url/api/v1/Info/Balance
            String bodyStr = objectMapper.writeValueAsString(asanFinanceRequest);
            String url = asanFinanceProperties.getApiUrl() + "/api/v1/Info/Balance";
            log.info("getBalanceInfo Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", "ApiKey",
                    asanFinanceProperties.getApiKey(), false);
            if (jsonResponse != null) {
                return objectMapper.readValue(
                        jsonResponse.toString(),
                        objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
                                BalanceInfoResponse.class));
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
