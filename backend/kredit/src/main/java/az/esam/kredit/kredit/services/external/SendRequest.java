package az.esam.kredit.kredit.services.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
public class SendRequest {

    @Autowired
    static ObjectMapper objectMapper;

    public static JsonNode executeRequest(String bodyStr, String url, String authKey) {
        JsonNode result = null;
        try {
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            Request.Builder builder = new Request.Builder()
                    .url(url)
                    .addHeader("Accept", "application/json")
                    .addHeader("Content-Type", "application/json; charset=utf-8");

            if (authKey != null && !authKey.isEmpty()) {
                builder.addHeader("X-Bridge-AuthorizationKey", authKey);
            }

            log.info("Service url : {} ", url);
            if (bodyStr != null && !bodyStr.isEmpty()) {
                okhttp3.MediaType mediaType = okhttp3.MediaType.parse("application/json");
                RequestBody body = RequestBody.create(bodyStr, mediaType);
                builder = builder.method("POST", body);
                log.info("Service body : {}", bodyStr);
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
