package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AsanFinancePensionerInfoResponseRepository extends MongoRepository<PensionerInfoResponse, String> {
    Optional<PensionerInfoResponse> findByPin(String pin);
}
