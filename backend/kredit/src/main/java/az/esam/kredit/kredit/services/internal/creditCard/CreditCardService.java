package az.esam.kredit.kredit.services.internal.creditCard;

import az.esam.kredit.kredit.entities.CreditCard;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CreditCardService {
    CreditCard add(CreditCard credit);

    CreditCard update(CreditCard credit);

    CreditCard get(String id);

    boolean delete(String id);

    List<CreditCard> list();

    Long count();

    Page<CreditCard> getCards(String cardNumber, String cvv, String expiryDate, String serialNumber, int page, int size);
}
