package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.AboutUs;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AboutUsRepository extends MongoRepository<AboutUs, String> {
}
