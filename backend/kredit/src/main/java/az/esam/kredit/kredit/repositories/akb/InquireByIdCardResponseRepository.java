package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard.InquireByIdCardResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InquireByIdCardResponseRepository extends MongoRepository<InquireByIdCardResponse, String> {
}
