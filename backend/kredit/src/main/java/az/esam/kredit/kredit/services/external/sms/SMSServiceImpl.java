package az.esam.kredit.kredit.services.external.sms;

import az.esam.kredit.kredit.properties.SMSServiceProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.apache.coyote.BadRequestException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@EnableConfigurationProperties(SMSServiceProperties.class)
public class SMSServiceImpl implements SMSService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    SMSServiceProperties prop;

    public JsonNode executeRequest(String bodyStr, String url) {
        JsonNode result = null;
        try {
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            Request.Builder builder = new Request.Builder()
                    .url(url)
                    .addHeader("Accept", "application/json")
                    .addHeader("Content-Type", "application/json; charset=utf-8");
            log.info("Service url : {} ", url);
            if (bodyStr != null && !bodyStr.isEmpty()) {
                okhttp3.MediaType mediaType = okhttp3.MediaType.parse("application/json");
                RequestBody body = RequestBody.create(bodyStr, mediaType);
                builder = builder.method("POST", body);
                log.info("Service body : {} ", bodyStr);
            } else {
                builder = builder.method("GET", null);
            }
            Request request = builder
                    .build();
            Response response = client.newCall(request).execute();
            String responseStr = response.body().string();
            log.info("Service resp : {} ", responseStr);
            result = objectMapper.readTree(responseStr);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return result;
    }

    private static String md5Hash(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hashInBytes = md.digest(input.getBytes(StandardCharsets.UTF_8));

        // bytes to hex
        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    @Override
    public int getSMSBalance() {
        try {
            String key = md5Hash(md5Hash(prop.getPassword()) + prop.getLogin());
            String url = prop.getApiUrl().concat("/balance?"
                    + "login=" + prop.getLogin()
                    + "&key=" + key);
            JsonNode root = executeRequest(null, url);
            return root != null ? root.get("obj").asInt() : 0;
        } catch (Exception ex) {
            log.error(null, ex);
            return 0;
        }
    }

    @Override
    public boolean sendSMS(String phoneNumber, String otpCode) {
        try {
            if (getSMSBalance() <= 0) {
                throw new BadRequestException("SMS balance is empty");
            }
            String passwordMd5 = md5Hash(prop.getPassword());
            String concat = passwordMd5 + prop.getLogin() + otpCode + phoneNumber + prop.getSenderName();
            String key = md5Hash(concat);

            JSONObject jsonObj = new JSONObject();
            jsonObj.put("login", prop.getLogin());
            jsonObj.put("key", key);
            jsonObj.put("msisdn", phoneNumber);
            jsonObj.put("text", otpCode);
            jsonObj.put("sender", prop.getSenderName());

            String url = prop.getApiUrl().concat("/smssender");
            JsonNode root = executeRequest(jsonObj.toJSONString(), url);
            return root != null && root.get("successMessage") != null;
        } catch (Exception ex) {
            log.error(null, ex);
            return false;
        }
    }

}
