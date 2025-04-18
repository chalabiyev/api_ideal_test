package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.OTPRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.Optional;

public interface OTPRepository extends MongoRepository<OTPRecord, String> {

    Optional<OTPRecord> findFirstByPhoneOrderByExpirationDateDesc(String phone);

    Optional<OTPRecord> findFirstByEmailOrderByExpirationDateDesc(String email);

    long countByPhoneAndSendDateBetween(String phone, Date startDate, Date endDate);

    long countByEmailAndSendDateBetween(String email, Date startDate, Date endDate);

}
