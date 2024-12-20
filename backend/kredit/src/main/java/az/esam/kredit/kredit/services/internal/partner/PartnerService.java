package az.esam.kredit.kredit.services.internal.partner;

import az.esam.kredit.kredit.dtos.requests.PartnerFormRequest;
import az.esam.kredit.kredit.entities.Partner;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PartnerService {

    Partner submitForm(PartnerFormRequest request);

    Partner add(Partner partner);

    Partner update(Partner partner);

    Partner get(String id);

    boolean delete(String id);

    Page<Partner> get(int page, int size);

    List<Partner> listAll();

    Long count();

    Partner changeStatus(String id, String status, Authentication authentication) throws BadRequestException;
}

