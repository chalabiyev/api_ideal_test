package az.esam.kredit.kredit.services.internal.credit;

import az.esam.kredit.kredit.entities.Credit;

import java.util.List;

public interface CreditService {

    Credit add(Credit credit);

    Credit update(Credit credit);

    Credit get(String id);

    boolean delete(String id);

    List<Credit> list();

    Long count();
}
