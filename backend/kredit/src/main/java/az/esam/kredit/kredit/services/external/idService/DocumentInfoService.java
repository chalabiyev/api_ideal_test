package az.esam.kredit.kredit.services.external.idService;

import az.esam.kredit.kredit.dtos.responses.document.IDCardInfoResponse;
import com.fasterxml.jackson.databind.JsonNode;

public interface DocumentInfoService {

    JsonNode getIdCardInfo(String documentNumber, String pin);

    JsonNode getMobileNumbersWithPin(String pin);

}
