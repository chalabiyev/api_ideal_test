package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.CreditType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditTypeRepository extends MongoRepository<CreditType, String> {
}
