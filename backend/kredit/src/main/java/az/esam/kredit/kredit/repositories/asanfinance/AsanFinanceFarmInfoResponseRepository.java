package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.farm.FarmInfoResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AsanFinanceFarmInfoResponseRepository extends MongoRepository<FarmInfoResponse, String> {

    Optional<FarmInfoResponse> findByPin(String pin);

    Optional<FarmInfoResponse> findByVoen(String voen);

}
