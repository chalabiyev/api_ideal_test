package az.esam.kredit.kredit.services.external.idService;

import az.esam.kredit.kredit.services.external.SendRequest;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DocumentInfoServiceImpl implements DocumentInfoService {

    @Autowired
    SendRequest sendRequest;

    @Override
    public JsonNode getIdCardInfo(String documentNumber, String pin) {
        try {
            String url = "iamas/document/getIdCardInfo?Pin=" + pin + "&DocumentNumber=" + documentNumber;
            System.out.println("url = " + url);
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getMobileNumbersWithPin(String pin) {
        try {
            String url = "mobile/numbers/getmobileNumbersWithPin/?Pin=" + pin;
            System.out.println("url = " + url);
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getCheckNumberWithPin(String pin, String number) {
        try {
            String url = "mobile/numbers/getCheckNumberWithPin/?phone=" + number + "&Pin=" + pin;
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getDocumentInfoByPhone(String phoneNumber) {
        try {
            String url = "mobile/numbers/getDocumentInfoByPhone/?phone=" + phoneNumber;
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getVehicleInfoByPin(String pin) {
        try {
            String url = "general/vehicle/getVehicleInfoByPin/?Pin=" + pin;
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getMigrationInfo(String migrationDocNumber, String migrationPin) {
        try {
            String url = "iamas/document/getMigrationInfo/?MigrationDocNumber=" + migrationDocNumber
                    + "&MigrationPin=" + migrationPin;
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getPassportInfo(String foreignDocNumber, String foreignPin) {
        try {
            String url = "iamas/document/getPassportInfo/?ForeignDocNumber=" + foreignDocNumber
                    + "&ForeignPin=" + foreignPin;
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }

    @Override
    public JsonNode getInfoByVoen(String voen) {
        try {
            String url = "general/etaxes/getInfoByVoen?Voen=" + voen;
            return sendRequest.executeRequest(url);
        } catch (Exception ex) {
            log.error(null, ex);
            return null;
        }
    }
}
