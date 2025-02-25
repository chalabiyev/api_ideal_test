package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.Insurance;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InsuranceRepository extends MongoRepository<Insurance, String> {
}
