package az.esam.kredit.kredit.repositories.akb;

import az.esam.kredit.kredit.dtos.responses.akbxml.Report;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AkbReportRepository extends MongoRepository<Report, String> {

    Optional<Report> findFirstByBorrowerFinOrderByReportingDateDesc(String fin);

}
