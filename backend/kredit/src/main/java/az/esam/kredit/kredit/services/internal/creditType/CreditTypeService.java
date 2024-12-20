package az.esam.kredit.kredit.services.internal.creditType;

import az.esam.kredit.kredit.entities.CreditType;

import java.util.List;

public interface CreditTypeService {

    CreditType add(CreditType creditType);

    CreditType update(CreditType creditType);

    CreditType get(String id);

    boolean delete(String id);

    List<CreditType> list();

    Long count();
}
