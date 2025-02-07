package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.voen.VoenInfoResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AsanFinanceVoenInfoResponseRepository extends MongoRepository<VoenInfoResponse, String> {
    Optional<VoenInfoResponse> findByVoen(String voen);
}
