package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Partner;
import az.esam.kredit.kredit.entities.enums.EFinalStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PartnerRepository extends MongoRepository<Partner, String> {
    boolean existsByPin(String pin);

    boolean existsByVoen(String voen);

    boolean existsByPhoneNumber(String phoneNumber);

    List<Partner> findByStatus(EFinalStatus eFinalStatus);
}
