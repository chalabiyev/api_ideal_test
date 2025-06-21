package az.esam.kredit.kredit.repositories.document;

import az.esam.kredit.kredit.dtos.responses.document.MobileNumberResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MobileNumberRepository extends MongoRepository<List<MobileNumberResponse>, String> {
    List<MobileNumberResponse> findByPin(String pin);
}
