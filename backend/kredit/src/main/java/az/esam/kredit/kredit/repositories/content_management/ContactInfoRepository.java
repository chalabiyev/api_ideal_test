package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.ContactInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactInfoRepository extends MongoRepository<ContactInfo, String> {
}
