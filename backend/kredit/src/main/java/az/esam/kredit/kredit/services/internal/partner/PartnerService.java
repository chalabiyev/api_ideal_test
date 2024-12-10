package az.esam.kredit.kredit.services.internal.partner;

import az.esam.kredit.kredit.entities.Partner;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PartnerService {
    Partner add(Partner partner);

    Partner update(Partner partner);

    Partner get(String id);

    boolean delete(String id);

    Page<Partner> get(int page, int size);

    List<Partner> listAll();

    Long count();
}

