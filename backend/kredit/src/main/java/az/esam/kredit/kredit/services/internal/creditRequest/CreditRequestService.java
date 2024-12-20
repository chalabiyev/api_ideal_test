package az.esam.kredit.kredit.services.internal.creditRequest;

import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CreditRequestService {

    CreditRequest create(CreditRequest request, Authentication authentication);

    SimaQRResponse activate(String creditRequestId, Authentication authentication);

    CreditRequest update(CreditRequest request);

    Boolean delete(String id);

    CreditRequest get(String id, Authentication authentication);

    List<CreditRequest> list();

    Long count();

}
