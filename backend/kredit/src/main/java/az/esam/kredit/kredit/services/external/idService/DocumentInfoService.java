package az.esam.kredit.kredit.services.external.idService;

import az.esam.kredit.kredit.dtos.responses.document.*;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.List;

public interface DocumentInfoService {

    FullIDCardInfoResponse getIdCardInfo(String documentNumber, String pin) throws IOException;

    List<MobileNumberResponse> getMobileNumbersWithPin(String pin);

    CheckNumberWithPinResponse getCheckNumberWithPin(String pin, String number);

    DocumentInfoByMobileNumberResponse getDocumentInfoByPhone(String phoneNumber) throws IOException;

    List<VehicleInfoResponse> getVehicleInfoByPin(String pin) throws IOException;

    MigrationDocumentInfoResponse getMigrationInfo(String migrationDocNumber, String migrationPin);

    PassportDocumentInfoResponse getPassportInfo(String foreignDocNumber, String foreignPin);

    VoenInfoResponse getInfoByVoen(String voen);
}

