package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.CreditRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditRequestRepository extends MongoRepository<CreditRequest, String> {
}
