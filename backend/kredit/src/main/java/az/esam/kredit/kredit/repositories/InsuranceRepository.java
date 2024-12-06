package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Insurance;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InsuranceRepository extends MongoRepository<Insurance, String> {
}
