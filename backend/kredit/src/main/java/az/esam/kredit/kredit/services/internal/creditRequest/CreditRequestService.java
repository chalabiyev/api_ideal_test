package az.esam.kredit.kredit.services.internal.creditRequest;

import az.esam.kredit.kredit.dtos.requests.CreditRequestSearchDto;
import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.enums.CreditRequestStatusEnum;
import az.esam.kredit.kredit.entities.enums.ECreditType;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;
import org.springframework.data.domain.Page;

public interface CreditRequestService {

    CreditRequest create(CreditRequest request, Authentication authentication);

    SimaQRResponse activate(String creditRequestId, String redirectUrl, Authentication authentication);

    CreditRequest update(CreditRequest request);

    Boolean delete(String id);

    CreditRequest get(String id, Authentication authentication);

    List<CreditRequest> list();

    Page<CreditRequest> search(CreditRequestSearchDto search, Authentication authentication);

    Long countOf(ECreditType creditType, Authentication authentication);

    Long countOfConfirmStatus(CreditRequestStatusEnum confirmStatus, Authentication authentication);

    Long count(Authentication authentication);

    CreditRequest acceptByAdmin(String creditRequestId, Authentication authentication);

    CreditRequest rejectByAdmin(String creditRequestId, Authentication authentication);

    Long countByCreditYear();

    String sendConfirmation(String urlNumber, Authentication authentication);

    String acceptConfirmation(String id, boolean isUsed, Authentication authentication);

    String rejectCredit(String id, String rejectPurpose, Authentication authentication);
}
