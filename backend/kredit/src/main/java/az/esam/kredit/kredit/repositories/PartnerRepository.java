package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Partner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PartnerRepository extends MongoRepository<Partner, String> {
}
