package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.BlacklistedIndividual;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlacklistedIndividualRepository extends MongoRepository<BlacklistedIndividual, String> {
    BlacklistedIndividual findByDataId(String dataId);
}
