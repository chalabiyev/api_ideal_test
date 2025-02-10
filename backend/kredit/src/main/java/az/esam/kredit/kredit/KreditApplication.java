package az.esam.kredit.kredit;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.GetBalanceResponse;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static az.esam.kredit.kredit.services.external.SendRequest.objectMapper;
import static az.esam.kredit.kredit.services.external.SendRequest.xmlMapper;


@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Kredit All API", version = "1.0", description = "Kredit All API"))
@SecurityScheme(name = "authentication", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
@SecurityScheme(name = "X-API-KEY", type = SecuritySchemeType.APIKEY, in = SecuritySchemeIn.HEADER)
public class KreditApplication {

    public static void main(String[] args) throws JsonProcessingException {
        SpringApplication.run(KreditApplication.class, args);

        String responseStr = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                "    <soap:Body>\n" +
                "        <ns2:getBalanceResponse xmlns:ns2=\"http://inquiryws.mkr.risk.az/\">\n" +
                "            <return>249.5</return>\n" +
                "        </ns2:getBalanceResponse>\n" +
                "    </soap:Body>\n" +
                "</soap:Envelope>";

        GetBalanceResponse result;

        JsonNode xmlNode = xmlMapper.readTree(responseStr);
        String jsonString = objectMapper.writeValueAsString(xmlNode.get("Body").get("getBalanceResponse"));
        result = objectMapper.readValue(jsonString, GetBalanceResponse.class);

        System.out.println(result);
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            storageService.init();
        };
    }
}
