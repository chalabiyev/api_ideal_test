package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.EAKBTYPES;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBTypeResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AKBTypeResponseRepository extends MongoRepository<AKBTypeResponse, String> {
    List<AKBTypeResponse> findByType(EAKBTYPES type);
}
