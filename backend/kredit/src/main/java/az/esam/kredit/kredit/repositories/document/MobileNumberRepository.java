package az.esam.kredit.kredit.repositories.document;

import az.esam.kredit.kredit.dtos.responses.document.MobileNumberResponse;
import az.esam.kredit.kredit.entities.MobileNumber;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MobileNumberRepository extends MongoRepository<MobileNumber, String> {
    List<MobileNumberResponse> findByPin(String pin);
}
