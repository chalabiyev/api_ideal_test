package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.Info;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InfoRepository extends MongoRepository<Info, String> {
}
