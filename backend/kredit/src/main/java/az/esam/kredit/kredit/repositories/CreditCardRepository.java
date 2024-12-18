package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.CreditCard;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditCardRepository extends MongoRepository<CreditCard, String> {
    CreditCard findByCardNumber(String cardNumber);

    CreditCard findBySerialNumber(String serialNumber);
}
