package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Partner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PartnerRepository extends MongoRepository<Partner, String> {
    boolean existsByPin(String pin);

    boolean existsByVoen(String voen);

    boolean existsByPhoneNumber(String phoneNumber);
}
