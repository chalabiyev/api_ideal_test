package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.passport.PassportInfoResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AsanFinancePassportInfoResponseRepository extends MongoRepository<PassportInfoResponse, String> {
    Optional<PassportInfoResponse> findByPIN(String pin);
}
