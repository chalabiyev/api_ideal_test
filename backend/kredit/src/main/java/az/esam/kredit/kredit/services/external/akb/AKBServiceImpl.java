package az.esam.kredit.kredit.services.external.akb;

import az.esam.kredit.kredit.services.external.SendRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AKBServiceImpl implements AKBService {


    @Autowired
    SendRequest sendRequest;

    @Value("${akb.authorization}")
    private String authKey;

    @Value("${akb.host}")
    private String host;

    private String authName = "Authorization";

    @Override
    public JsonNode getBatchStatus(String batchid) {
//        try {
//            String url = "iamas/document/getIdCardInfo?Pin=" + pin + "&DocumentNumber=" + documentNumber;
//            System.out.println("url = " + url);
//            return sendRequest.executeRequest(url, authName, authKey, host);
//        } catch (Exception ex) {
//            log.error(null, ex);
//            return null;
//        }
            return null;
    }
}
