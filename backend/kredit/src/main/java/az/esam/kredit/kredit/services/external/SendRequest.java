package az.esam.kredit.kredit.services.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class SendRequest {

    @Autowired
    private ObjectMapper objectMapper;

    public JsonNode executeRequest(String url, String authName, String authKey, String host) {
        JsonNode result = null;
        Response response = null;
        log.info("authKey : {} ", authKey);
        log.info("host : {} ", host);
        try {
            url = host + url;
            // Create an OkHttpClient instance
            OkHttpClient client = new OkHttpClient();

            // Build the request with headers
            Request request = new Request.Builder()
                    .url(url)
                    .get() // HTTP GET method
                    .addHeader(authName, authKey)
                    .build();

            log.info("Service url : {} ", url);
            log.info("Service request : {} ", request);

            try {
                // Execute the request
                response = client.newCall(request).execute();

                // Print the response
                if (response.isSuccessful() && response.body() != null) {
                    String responseStr = response.body().string();
                    log.info("Service resp : {} ", responseStr);
                    result = objectMapper.readTree(responseStr);

                    log.info("Service result : {} ", result);
                } else {
                    log.error("Request failed with status code: {}", response.code());
                }
            } catch (IOException e) {
                log.error(e.getMessage());
            } finally {
                // Close the response to avoid connection leaks
                if (response != null) {
                    response.close();
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        } finally {
            if (response != null) {
                response.close();
            }
        }
        return result;
    }
}
