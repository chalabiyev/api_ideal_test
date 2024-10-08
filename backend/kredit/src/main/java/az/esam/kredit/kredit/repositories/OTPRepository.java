package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.OTPRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OTPRepository extends MongoRepository<OTPRecord, String> {

    List<OTPRecord> findByEmail(String email);

    List<OTPRecord> findByPhone(String phone);
}
