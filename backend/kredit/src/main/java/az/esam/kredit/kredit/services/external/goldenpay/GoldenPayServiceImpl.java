package az.esam.kredit.kredit.services.external.goldenpay;

import az.esam.kredit.kredit.dtos.requests.goldenpay.GetPaymentKeyRequest;
import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentKeyResponse;
import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentResultResponse;
import az.esam.kredit.kredit.properties.GoldenPayProperties;
import az.esam.kredit.kredit.repositories.goldenpay.GetPaymentKeyResponseRepository;
import az.esam.kredit.kredit.repositories.goldenpay.GetPaymentResultResponseRepository;
import az.esam.kredit.kredit.services.external.SendRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Slf4j
@Service
@EnableConfigurationProperties(GoldenPayProperties.class)
public class GoldenPayServiceImpl implements GoldenPayService {

    @Autowired
    GoldenPayProperties properties;

    @Autowired
    SendRequest sendRequest;

    @Autowired
    GetPaymentKeyResponseRepository paymentKeyResponseRepository;

    @Autowired
    GetPaymentResultResponseRepository paymentResultResponseRepository;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public GetPaymentKeyResponse getPaymentKey(GetPaymentKeyRequest request) {
        try {
//            url =  "https://rest.goldenpay.az/web/service/merchant/getPaymentKey"
            request.setMerchantName(properties.getMerchantName());
            String md5 = crypt(properties.getAuthKey() + properties.getMerchantName() + request.getCardType() + request.getAmount() + request.getDescription());
            request.setHashCode(md5);
            String bodyStr = objectMapper.writeValueAsString(request);
            String url = properties.getApiUrl() + "/web/service/merchant/getPaymentKey";
            log.info("getPaymentKey Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(bodyStr, url, "POST", null, null, false);
            if (jsonResponse.has("paymentKey") && !jsonResponse.get("paymentKey").isNull()) {
                GetPaymentKeyResponse paymentKeyResponse = objectMapper.readValue(
                        jsonResponse.toString(),
                        GetPaymentKeyResponse.class
                );
                paymentKeyResponse.setPaymentUrl(properties.getPaymentUrl() + paymentKeyResponse.getPaymentKey());
                paymentKeyResponseRepository.save(paymentKeyResponse);
                return paymentKeyResponse;
            } else {
                log.error("getPaymentKey Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    @Override
    public GetPaymentResultResponse getPaymentResult(String paymentKey) {
        try {
//            URL: https://rest.goldenpay.az/web/service/merchant/getPaymentResult
            String hashCode = crypt(properties.getAuthKey() + paymentKey);

            String url = properties.getApiUrl() + "/web/service/merchant/getPaymentResult?payment_key="
                    + paymentKey + "&hash_code=" + hashCode;
            log.info("getPaymentRequest Request URL: {}", url);
            JsonNode jsonResponse = sendRequest.executeRequest(null, url, "POST", null, null, false);
            if (jsonResponse != null) {
                GetPaymentResultResponse response = objectMapper.readValue(
                        jsonResponse.toString(),
                        GetPaymentResultResponse.class
                );
                paymentResultResponseRepository.save(response);
                return response;
            } else {
                log.error("getPaymentRequest Response is null or empty");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
        return null;
    }

    public static String crypt(String str) {
        if (str == null || str.isEmpty()) {
            throw new IllegalArgumentException("String to encript cannot be null or zero length");
        }

        StringBuilder hexString = new StringBuilder();

        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte[] hash = md.digest();

            for (byte b : hash) {
                if ((0xff & b) < 0x10) {
                    hexString.append("0").append(Integer.toHexString((0xFF & b)));
                } else {
                    hexString.append(Integer.toHexString(0xFF & b));
                }
            }
        } catch (NoSuchAlgorithmException e) {
            log.error("Error while hashing the string", e);
        }

        return hexString.toString();
    }
}
