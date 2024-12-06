package az.esam.kredit.kredit.repositories.sima;

import az.esam.kredit.kredit.entities.sima.SimaEncodedContract;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SimaEncodedContractRepository extends MongoRepository<SimaEncodedContract, String> {

    Optional<SimaEncodedContract> findByEncodedContract(String encodedContract);

    Optional<SimaEncodedContract> findByOperationId(String operationId);

}
