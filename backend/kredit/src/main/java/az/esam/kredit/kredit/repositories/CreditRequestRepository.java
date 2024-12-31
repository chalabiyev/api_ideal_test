package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.enums.ECreditType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditRequestRepository extends MongoRepository<CreditRequest, String> {

    public long countByCreditType(ECreditType creditType);

}
