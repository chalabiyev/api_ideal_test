package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBCurrencyResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AKBCurrencyResponseRepository extends MongoRepository<AKBCurrencyResponse, String> {
}
