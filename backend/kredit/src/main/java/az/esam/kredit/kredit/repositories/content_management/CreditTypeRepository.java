package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.CreditType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditTypeRepository extends MongoRepository<CreditType, String> {
}
