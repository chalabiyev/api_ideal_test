package az.esam.kredit.kredit.services.internal.refresh;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.VehicleInfoResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface RefreshService {

    FullIDCardInfoResponse refreshPersonalInfo(String pin, String documentNumber, Authentication authentication);

    String refreshAKBRequest(String pin, Authentication authentication);

    EmployeeInfoResponse refreshEmployeeInfo(String pin, Authentication authentication);

    PensionerInfoResponse refreshPensionerInfo(String pin, Authentication authentication);

    List<VehicleInfoResponse> refreshVehicleInfo(String pin, Authentication authentication);

}
