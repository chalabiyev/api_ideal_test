package az.esam.kredit.kredit.services.external.sms;

import az.esam.kredit.kredit.dtos.requests.NToNRequest;
import az.esam.kredit.kredit.dtos.requests.SendSmsRequest;
import az.esam.kredit.kredit.dtos.responses.sms.SmsResponse;
import az.esam.kredit.kredit.dtos.responses.sms.SmsStatusResponse;
import az.esam.kredit.kredit.properties.SMSServiceProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@EnableConfigurationProperties(SMSServiceProperties.class)
public class SMSServiceImpl implements SMSService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    SMSServiceProperties prop;

    @Override
    public int getSMSBalance() {
        try {
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("Username", prop.getUsername());
            jsonObj.put("Password", prop.getPassword());

            String url = prop.getApiUrl().concat("/CreditBalance");
            JsonNode root = executeRequest(jsonObj.toJSONString(), url);
            if (root != null) {
                return root.get("Result").get("Balance").asInt();
            } else {
                throw new RuntimeException("Error while getting SMS balance");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            throw new RuntimeException("Error while getting SMS balance");
        }
    }

    @Override
    public List<SmsResponse> sendSMSOneToN(SendSmsRequest request) {
        try {
            JSONObject jsonObj = new JSONObject();

            jsonObj.put("Username", prop.getUsername());
            jsonObj.put("Password", prop.getPassword());
            jsonObj.put("Message", request.getMessage());
            jsonObj.put("Receivers", request.getNumbers());

            String url = prop.getApiUrl().concat("/Send_1_N ");
            JsonNode root = executeRequest(jsonObj.toJSONString(), url);
            if (root != null) {
                return objectMapper.readValue(
                        root.get("Result").toString(),
                        objectMapper.getTypeFactory().constructParametricType(List.class, SmsResponse.class)
                );
            } else {
                throw new RuntimeException("Error while sending SMS");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            throw new RuntimeException("Error while sending SMS");
        }
    }

    @Override
    public List<SmsResponse> sendSMSNToN(List<NToNRequest> messages) {
        try {
            JSONObject jsonObj = new JSONObject();

            jsonObj.put("Username", prop.getUsername());
            jsonObj.put("Password", prop.getPassword());

            JSONArray messagesArray = new JSONArray();
            for (NToNRequest message : messages) {
                JSONObject messageObj = new JSONObject();
                messageObj.put("Receiver", message.getNumber());
                messageObj.put("Message", message.getMessage());
                messagesArray.add(messageObj);
            }

            jsonObj.put("Messages", messagesArray);

            String url = prop.getApiUrl().concat("/Send_N_N ");
            JsonNode root = executeRequest(jsonObj.toJSONString(), url);
            if (root != null) {
                return objectMapper.readValue(
                        root.get("Result").toString(),
                        objectMapper.getTypeFactory().constructParametricType(List.class, SmsResponse.class)
                );
            } else {
                throw new RuntimeException("Error while sending SMS");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            throw new RuntimeException("Error while sending SMS");
        }
    }

    @Override
    public List<SmsStatusResponse> getSMSStatus(List<String> messageIds) {
        try {
            JSONObject jsonObj = new JSONObject();

            jsonObj.put("Username", prop.getUsername());
            jsonObj.put("Password", prop.getPassword());
            jsonObj.put("MessageIds", messageIds);

            String url = prop.getApiUrl().concat("/Status ");
            JsonNode root = executeRequest(jsonObj.toJSONString(), url);
            if (root != null) {
                return objectMapper.readValue(
                        root.get("Result").toString(),
                        objectMapper.getTypeFactory().constructParametricType(List.class, SmsStatusResponse.class)
                );
            } else {
                throw new RuntimeException("Error while sending SMS");
            }
        } catch (Exception ex) {
            log.error(null, ex);
            throw new RuntimeException("Error while sending SMS");
        }
    }

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
                RequestBody body = RequestBody.create(bodyStr.getBytes(StandardCharsets.UTF_8), mediaType);
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
}
