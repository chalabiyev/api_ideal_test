package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.vin.VinInfoResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AsanFinanceVinInfoResponseRepository extends MongoRepository<VinInfoResponse, String> {
    Optional<VinInfoResponse> findByVin(String vin);
}
