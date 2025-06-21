package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Leasing;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LeasingRepository extends MongoRepository<Leasing, String> {
}
