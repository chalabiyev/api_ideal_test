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
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;

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

    public JsonNode sendRequest(String url, String data) throws IOException, InterruptedException {
        JsonNode result = null;
        HttpClient client = HttpClient.newHttpClient();

        // Prepare the builder
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Authorization", "Basic TUFNTUFET1YgQUxJMjpCQWhraks0SA==")
                .header("Content-Type", "application/json")
                .header("Connection", "keep-alive")
                .header("Referer", "http://app.acb.az:8002/")
                .header("Origin", "http://app.acb.az:8002");

        // Add a body to the GET request if data is not null or empty
        if (data != null && !data.isEmpty()) {
            requestBuilder.method("GET", HttpRequest.BodyPublishers.ofString(data));
        } else {
            requestBuilder.GET();
        }

        try {
            // Build the request
            HttpRequest request = requestBuilder.build();

            // Send the request
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            log.info("Response status: {}", response.statusCode());
            if (response.statusCode() == 200) {
                String responseStr = response.body();
                log.info("AKB service response: {}", responseStr);
                result = objectMapper.readTree(responseStr);
                log.info("AKB Service result: {}", result);
            } else {
                throw new IOException("Error response: " + response.body());
            }
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage());
            throw e;
        }

        return result;
    }

    public JsonNode sendPostRequestWithFile(String url, Path filePath) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        // Boundary for multipart form-data
        String boundary = "----Boundary" + System.currentTimeMillis();

        // Read file content
        byte[] fileBytes = Files.readAllBytes(filePath);

        // Build the multipart body
        StringBuilder bodyBuilder = new StringBuilder();
        bodyBuilder.append("--").append(boundary).append("\r\n")
                .append("Content-Disposition: form-data; name=\"file\"; filename=\"")
                .append(filePath.getFileName().toString()).append("\"\r\n")
                .append("Content-Type: application/octet-stream\r\n\r\n")
                .append(new String(fileBytes)).append("\r\n")
                .append("--").append(boundary).append("--\r\n");

        String multipartBody = bodyBuilder.toString();

        // Build the request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .header("Authorization", "Basic TUFNTUFET1YgQUxJMjpCQWhraks0SA==")
                .POST(HttpRequest.BodyPublishers.ofString(multipartBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        // Check response and parse JSON
        if (response.statusCode() == 200) {
            return objectMapper.readTree(response.body());
        } else {
            throw new IOException("Error response from server: " + response.statusCode() + " - " + response.body());
        }
    }
}
