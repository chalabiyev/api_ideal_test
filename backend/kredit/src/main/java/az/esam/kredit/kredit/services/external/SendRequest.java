package az.esam.kredit.kredit.services.external;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Slf4j
@Service
public class SendRequest {

    public static final ObjectMapper objectMapper = new ObjectMapper();
    public static final XmlMapper xmlMapper = new XmlMapper();

    public OkHttpClient createClientWithPfx(String pfxPath, String passwordStr) throws Exception {
        // 1. KeyStore oluştur (PKCS12 formatında)
        KeyStore keyStore = KeyStore.getInstance("PKCS12");
        try (InputStream is = new FileInputStream(pfxPath)) {
            keyStore.load(is, passwordStr.toCharArray());
        }

        // 2. KeyManagerFactory başlat
        KeyManagerFactory kmf = KeyManagerFactory
                .getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(keyStore, passwordStr.toCharArray());

        // 3. TRUST-ALL TrustManager oluştur
        TrustManager[] trustAllCerts = new TrustManager[] {
                new X509TrustManager() {
                    @Override
                    public void checkClientTrusted(X509Certificate[] chain, String authType) {
                        // Her şeyi kabul et
                    }

                    @Override
                    public void checkServerTrusted(X509Certificate[] chain, String authType) {
                        // Her şeyi kabul et
                    }

                    @Override
                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                }
        };

        // 4. SSLContext oluştur
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(kmf.getKeyManagers(), trustAllCerts, null);

        // 5. Hostname doğrulamayı devre dışı bırak (yalnızca test için!)
        HostnameVerifier hostnameVerifier = (hostname, session) -> true;

        return new OkHttpClient.Builder()
                .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0])
                .hostnameVerifier(hostnameVerifier)
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
    }

    public String executeRequestAKBStr(String bodyStr, String url, String method, String authName, String authKey,
            boolean isXml) {
        String result = null;
        try {
            OkHttpClient client = createClientWithPfx("555.pfx", "555");
            Request.Builder builder = new Request.Builder()
                    .url(url);

            if (isXml) {
                builder.addHeader("Accept", "application/xml")
                        .addHeader("Content-Type", "application/xml; charset=utf-8");
            } else {
                builder.addHeader("Accept", "application/json")
                        .addHeader("Content-Type", "application/json; charset=utf-8");
            }

            if (authName != null && authKey != null) {
                builder = builder.addHeader(authName, authKey);
            }
            log.info("Service URL: {}", url);

            if ("GET".equalsIgnoreCase(method)) {
                builder = builder.method("GET", null);
            } else if ("POST".equalsIgnoreCase(method)) {
                okhttp3.MediaType mediaType = okhttp3.MediaType.parse(isXml ? "application/xml" : "application/json");
                RequestBody body = (bodyStr != null && !bodyStr.isEmpty())
                        ? RequestBody.create(bodyStr, mediaType)
                        : RequestBody.create(isXml ? "<empty/>" : "{}", mediaType);
                builder = builder.method("POST", body);
                log.info("Service body: {}", bodyStr);
            }

            Request request = builder.build();
            try (Response response = client.newCall(request).execute()) {
                int statusCode = response.code();
                if (response.body() == null) {
                    log.error("Response body is null with status code {}", statusCode);
                    throw new RuntimeException("Response body is null with status code " + statusCode);
                }
                String responseStr = response.body().string();
                log.info("Service response: {} {}", responseStr, statusCode);

                if (!response.isSuccessful()) {
                    log.error("Request failed with status code: {} and message {}", statusCode, responseStr);
                    throw new RuntimeException(
                            "Request failed with status code: " + statusCode + " and message " + responseStr);
                }

                result = responseStr;
            }
        } catch (Exception e) {
            log.error("Unexpected error occurred: {}", e.getMessage());
            throw new RuntimeException("Request execution failed", e);
        }
        return result;
    }

    public JsonNode executeRequestAKB(String bodyStr, String url, String method, String authName, String authKey,
            boolean isXml) {
        JsonNode result = null;
        try {
            OkHttpClient client = createClientWithPfx("555.pfx", "555");
            Request.Builder builder = new Request.Builder()
                    .url(url);

            if (isXml) {
                builder.addHeader("Accept", "application/xml")
                        .addHeader("Content-Type", "application/xml; charset=utf-8");
            } else {
                builder.addHeader("Accept", "application/json")
                        .addHeader("Content-Type", "application/json; charset=utf-8");
            }

            if (authName != null && authKey != null) {
                builder = builder.addHeader(authName, authKey);
            }
            log.info("Service URL: {}", url);

            if ("GET".equalsIgnoreCase(method)) {
                builder = builder.method("GET", null);
            } else if ("POST".equalsIgnoreCase(method)) {
                okhttp3.MediaType mediaType = okhttp3.MediaType.parse(isXml ? "application/xml" : "application/json");
                RequestBody body = (bodyStr != null && !bodyStr.isEmpty())
                        ? RequestBody.create(bodyStr, mediaType)
                        : RequestBody.create(isXml ? "<empty/>" : "{}", mediaType);
                builder = builder.method("POST", body);
                log.info("Service body: {}", bodyStr);
            }

            Request request = builder.build();
            try (Response response = client.newCall(request).execute()) {
                int statusCode = response.code();
                if (response.body() == null) {
                    log.error("Response body is null with status code {}", statusCode);
                    throw new RuntimeException("Response body is null with status code " + statusCode);
                }
                String responseStr = response.body().string();
                log.info("Service response: {} {}", responseStr, statusCode);

                if (!response.isSuccessful()) {
                    log.error("Request failed with status code: {} and message {}", statusCode, responseStr);
                    throw new RuntimeException(
                            "Request failed with status code: " + statusCode + " and message " + responseStr);
                }

                if (isXml) {
                    JsonNode xmlNode = xmlMapper.readTree(responseStr);
                    String jsonString = objectMapper.writeValueAsString(xmlNode);
                    result = objectMapper.readTree(jsonString);
                } else {
                    result = objectMapper.readTree(responseStr);
                }
            }
        } catch (Exception e) {
            log.error("Unexpected error occurred: {}", e.getMessage());
            throw new RuntimeException("Request execution failed", e);
        }
        return result;
    }

    public JsonNode executeRequest(String bodyStr, String url, String method, String authName, String authKey,
            boolean isXml) {
        JsonNode result = null;
        try {
            // SSL doğrulamasını devre dışı bırakmak için özel TrustManager ve
            // HostnameVerifier oluşturun
            TrustManager[] trustAllCerts = new TrustManager[] {
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType)
                                throws CertificateException {
                            // Herhangi bir kontrol yapma (güvenilir kabul et)
                        }

                        @Override
                        public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType)
                                throws CertificateException {
                            // Herhangi bir kontrol yapma (güvenilir kabul et)
                        }

                        @Override
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return new java.security.cert.X509Certificate[] {};
                        }
                    }
            };

            // SSLContext'i oluşturun ve TrustManager'ı ayarlayın
            SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

            OkHttpClient client = new OkHttpClient.Builder()
                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0])
                    .hostnameVerifier((hostname, session) -> true) // Hostname doğrulamasını devre dışı bırak
                    .connectTimeout(30, TimeUnit.SECONDS) // Bağlantı zaman aşımı
                    .readTimeout(30, TimeUnit.SECONDS) // Okuma zaman aşımı
                    .writeTimeout(30, TimeUnit.SECONDS)
                    .build();
            Request.Builder builder = new Request.Builder()
                    .url(url);

            if (isXml) {
                builder.addHeader("Accept", "application/xml")
                        .addHeader("Content-Type", "application/xml; charset=utf-8");
            } else {
                builder.addHeader("Accept", "application/json")
                        .addHeader("Content-Type", "application/json; charset=utf-8");
            }

            if (authName != null && authKey != null) {
                builder = builder.addHeader(authName, authKey);
            }
            log.info("Service URL: {}", url);

            if ("GET".equalsIgnoreCase(method)) {
                builder = builder.method("GET", null);
            } else if ("POST".equalsIgnoreCase(method)) {
                okhttp3.MediaType mediaType = okhttp3.MediaType.parse(isXml ? "application/xml" : "application/json");
                RequestBody body = (bodyStr != null && !bodyStr.isEmpty())
                        ? RequestBody.create(bodyStr, mediaType)
                        : RequestBody.create(isXml ? "<empty/>" : "{}", mediaType);
                builder = builder.method("POST", body);
                log.info("Service body: {}", bodyStr);
            }

            Request request = builder.build();
            try (Response response = client.newCall(request).execute()) {
                int statusCode = response.code();
                if (response.body() == null) {
                    log.error("Response body is null with status code {}", statusCode);
                    throw new RuntimeException("Response body is null with status code " + statusCode);
                }
                String responseStr = response.body().string();
                log.info("Service response: {} {}", responseStr, statusCode);

                if (!response.isSuccessful()) {
                    log.error("Request failed with status code: {} and message {}", statusCode, responseStr);
                    throw new RuntimeException(
                            "Request failed with status code: " + statusCode + " and message " + responseStr);
                }

                if (isXml) {
                    JsonNode xmlNode = xmlMapper.readTree(responseStr);
                    String jsonString = objectMapper.writeValueAsString(xmlNode);
                    result = objectMapper.readTree(jsonString);
                } else {
                    result = objectMapper.readTree(responseStr);
                }
            }
        } catch (Exception e) {
            log.error("Unexpected error occurred: {}", e.getMessage());
            throw new RuntimeException("Request execution failed", e);
        }
        return result;
    }

    public JsonNode sendRequest(String url, String data, String username, String password)
            throws IOException, InterruptedException {
        JsonNode result = null;
        // Encode credentials to Base64
        String credentials = username + ":" + password;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

        HttpClient client = HttpClient.newHttpClient();

        // Prepare the builder
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Authorization", "Basic " + encodedCredentials)
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
