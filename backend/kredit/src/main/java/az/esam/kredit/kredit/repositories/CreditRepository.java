package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Credit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditRepository extends MongoRepository<Credit, String> {
}
