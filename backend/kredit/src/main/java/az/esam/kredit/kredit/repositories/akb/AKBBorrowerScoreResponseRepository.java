package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBBorrowerScoreResponse;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AKBBorrowerScoreResponseRepository extends MongoRepository<AKBBorrowerScoreResponse, String> {

    public Optional<AKBBorrowerScoreResponse> findByReportId(String reportId);
}
