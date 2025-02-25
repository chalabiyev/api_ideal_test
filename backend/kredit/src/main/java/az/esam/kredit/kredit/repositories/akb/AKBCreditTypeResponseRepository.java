package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBCreditTypeResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AKBCreditTypeResponseRepository extends MongoRepository<AKBCreditTypeResponse, String> {
}
