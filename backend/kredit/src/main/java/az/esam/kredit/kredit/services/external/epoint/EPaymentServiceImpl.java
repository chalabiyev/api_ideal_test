package az.esam.kredit.kredit.services.external.epoint;

import az.esam.kredit.kredit.dtos.requests.payment.InAppPaymentRequest;
import az.esam.kredit.kredit.dtos.requests.payment.PaymentRequest;
import az.esam.kredit.kredit.dtos.requests.payment.PaymentStatusRequest;
import az.esam.kredit.kredit.dtos.responses.payment.PaymentResponse;
import az.esam.kredit.kredit.dtos.responses.payment.PaymentStatusResponse;
import az.esam.kredit.kredit.properties.EPointPaymentProperties;
import az.esam.kredit.kredit.repositories.PaymentRequestRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.underscore.lodash.U;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@EnableConfigurationProperties(EPointPaymentProperties.class)
public class EPaymentServiceImpl implements EPaymentService {

    @Autowired
    EPointPaymentProperties ePaymentProperties;

    @Autowired
    PaymentRequestRepository paymentRequestRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Logger logger = Logger.getLogger("PaymentService");

    @Override
    public PaymentResponse startPayment(PaymentRequest paymentRequest) throws JsonProcessingException {
        paymentRequest.setError_redirect_url(ePaymentProperties.getErrorUrl());
        paymentRequest.setSuccess_redirect_url(ePaymentProperties.getSuccessURL());
        paymentRequest.setLanguage(ePaymentProperties.getLanguage());
        paymentRequest.setPublic_key(ePaymentProperties.getPublicKey());
        paymentRequest.setCurrency(ePaymentProperties.getCurrency());
        String jsonString = objectMapper.writeValueAsString(paymentRequest);
        String data = encodeBase64(jsonString.getBytes());
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String signature = encodeBase64(encodeSHA1(sgn_string));
        try {
            String response = sendRequest("/request", data, signature);
            paymentRequestRepository.insert(paymentRequest);
            logger.log(Level.SEVERE, "started payment request : {0}", paymentRequest.toString());
            logger.log(Level.SEVERE, "started payment response : {0}", response);
            return objectMapper.readValue(response, PaymentResponse.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Map<String, Object> startTokenPayment(PaymentRequest paymentRequest) throws Exception {
        paymentRequest.setLanguage(ePaymentProperties.getLanguage());
        paymentRequest.setPublic_key(ePaymentProperties.getPublicKey());
        paymentRequest.setCurrency(ePaymentProperties.getCurrency());
        String jsonString = objectMapper.writeValueAsString(paymentRequest);
        String data = encodeBase64(jsonString.getBytes());
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String signature = encodeBase64(encodeSHA1(sgn_string));
        try {
            String response = sendRequest("/token/payment", data, signature);
            paymentRequestRepository.insert(paymentRequest);
            logger.log(Level.SEVERE, "startTokenPayment request : {0}", paymentRequest.toString());
            logger.log(Level.SEVERE, "startTokenPayment response : {0}", response);
            return U.fromJsonMap(response);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error", e);
        }
        return null;
    }

    @Override
    public Map<String, Object> applePaySession() throws Exception {
        Map<String, Object> paymentRequest = new HashMap();
        paymentRequest.put("public_key", ePaymentProperties.getPublicKey());
        paymentRequest.put("origin", ePaymentProperties.getOrigin());
        String jsonString = U.toJson(paymentRequest);
        String data = encodeBase64(jsonString.getBytes());
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String signature = encodeBase64(encodeSHA1(sgn_string));
        try {
            String response = sendRequest("token/apple/session", data, signature);
            logger.log(Level.SEVERE, "applePaySession request : {0}", paymentRequest.toString());
            logger.log(Level.SEVERE, "applePaySession response : {0}", response);
            return U.fromJsonMap(response);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error", e);
        }
        return null;
    }

    @Override
    public PaymentStatusResponse applePay(InAppPaymentRequest paymentRequest) throws Exception {
        paymentRequest.setPublic_key(ePaymentProperties.getPublicKey());
        String jsonString = objectMapper.writeValueAsString(paymentRequest);
        String data = encodeBase64(jsonString.getBytes());
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String signature = encodeBase64(encodeSHA1(sgn_string));
        try {
            String response = sendRequest("token/apple/pay", data, signature);
            logger.log(Level.SEVERE, "applePay request : {0}", paymentRequest.toString());
            logger.log(Level.SEVERE, "applePay response : {0}", response);
            return objectMapper.readValue(response, PaymentStatusResponse.class);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error", e);
        }
        return null;
    }

    @Override
    public PaymentStatusResponse googlePay(InAppPaymentRequest paymentRequest) throws Exception {
        paymentRequest.setPublic_key(ePaymentProperties.getPublicKey());
        String jsonString = objectMapper.writeValueAsString(paymentRequest);
        String data = encodeBase64(jsonString.getBytes());
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String signature = encodeBase64(encodeSHA1(sgn_string));
        try {
            String response = sendRequest("token/google/pay", data, signature);
            logger.log(Level.SEVERE, "googlePay request : {0}", paymentRequest.toString());
            logger.log(Level.SEVERE, "googlePay response : {0}", response);
            return objectMapper.readValue(response, PaymentStatusResponse.class);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error", e);
        }
        return null;
    }

    @Override
    public PaymentStatusResponse checkPaymentStatus(String transaction) throws JsonProcessingException {

        String jsonString = objectMapper.writeValueAsString(PaymentStatusRequest.builder()
                .public_key(ePaymentProperties.getPublicKey())
                .transaction(transaction)
                .build());
        String data = encodeBase64(jsonString.getBytes());
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String signature = encodeBase64(encodeSHA1(sgn_string));
        try {
            String response = sendRequest("/get-status", data, signature);
            logger.log(Level.SEVERE, "check payment response : {0}", response);
            return objectMapper.readValue(response, PaymentStatusResponse.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String sendRequest(String endPoint, String data, String signature) throws IOException {
        // send data and signature to api/1/request url
        Map<String, String> posData = new HashMap<>();
        posData.put("data", data);
        posData.put("signature", signature);

        StringBuilder posDataString = new StringBuilder();
        for (Map.Entry<String, String> entry : posData.entrySet()) {
            if (!posDataString.isEmpty()) {
                posDataString.append("&");
            }
            posDataString.append(entry.getKey());
            posDataString.append("=");
            posDataString.append(entry.getValue());
        }

        URL url = new URL(ePaymentProperties.getApiUrl().concat(endPoint));
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setDoInput(true);

        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = posDataString.toString().getBytes(StandardCharsets.UTF_8);
            os.write(input);
            os.flush();
        }

        StringBuilder response = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
        }
        return response.toString();
    }

    private String encodeBase64(byte[] hash) {
        // encode data with base64
        return Base64.getEncoder().encodeToString(hash);
    }

    private byte[] encodeSHA1(String data) {
        // encode data with sha1
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            return digest.digest(data.getBytes());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    // decode base64
    private byte[] decodeBase64(String data) {
        return Base64.getDecoder().decode(data);
    }

    private boolean verifySignature(String data, String signature) {
        // verify signature
        String sgn_string = ePaymentProperties.getPrivateKey() + data + ePaymentProperties.getPrivateKey();
        String newSignature = encodeBase64(encodeSHA1(sgn_string));
        return newSignature.equals(signature);
    }

}
