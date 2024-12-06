package az.esam.kredit.kredit.services.external.idService;

import az.esam.kredit.kredit.dtos.responses.document.*;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public interface DocumentInfoService {

    FullIDCardInfoResponse getIdCardInfo(String documentNumber, String pin);

    List<MobileNumberResponse> getMobileNumbersWithPin(String pin);

    CheckNumberWithPinResponse getCheckNumberWithPin(String pin, String number);

    DocumentInfoByMobileNumberResponse getDocumentInfoByPhone(String phoneNumber);

    VehicleInfoResponse getVehicleInfoByPin(String pin);

    MigrationDocumentInfoResponse getMigrationInfo(String migrationDocNumber, String migrationPin);

    PassportDocumentInfoResponse getPassportInfo(String foreignDocNumber, String foreignPin);

    VoenInfoResponse getInfoByVoen(String voen);
}
