package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.utilityServiceResponse.AKBUtilityServiceResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AKBUtilityServiceResponseRepository extends MongoRepository<AKBUtilityServiceResponse, String> {
}
