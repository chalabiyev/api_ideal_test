package az.esam.kredit.kredit.services.external.idService;

import com.fasterxml.jackson.databind.JsonNode;

public interface DocumentInfoService {

    JsonNode getIdCardInfo(String documentNumber, String pin);

    JsonNode getMobileNumbersWithPin(String pin);

    JsonNode getCheckNumberWithPin(String pin, String number);

    JsonNode getDocumentInfoByPhone(String phoneNumber);

    JsonNode getVehicleInfoByPin(String pin);

    JsonNode getMigrationInfo(String migrationDocNumber, String migrationPin);

    JsonNode getPassportInfo(String foreignDocNumber, String foreignPin);

    JsonNode getInfoByVoen(String voen);
}
