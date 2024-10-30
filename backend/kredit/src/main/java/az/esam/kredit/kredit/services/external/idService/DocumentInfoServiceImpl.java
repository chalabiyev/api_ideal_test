package az.esam.kredit.kredit.services.external.idService;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static az.esam.kredit.kredit.services.external.SendRequest.executeRequest;

@Slf4j
@Service
public class DocumentInfoServiceImpl implements DocumentInfoService {

    @Value("${azinbridge.key}")
    private String authKey;

    @Value("${azinbridge.host}")
    private String host;

    @Override
    public JsonNode getIdCardInfo(String documentNumber, String pin) {
        try {
            String url = host + "/api/iamas/document/getIdCardInfo/?DocumentNumber=" + documentNumber + "&Pin=" + pin;
            JsonNode root = executeRequest(null, url, authKey);
            return root;
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getMobileNumbersWithPin(String pin) {
        try {
            String url = host + "/api/mobile/numbers/getmobileNumbersWithPin/?Pin=" + pin;
            JsonNode root = executeRequest(null, url, authKey);
            return root;
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }
}
