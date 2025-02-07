package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.PersonalInfoAllResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AsanFinancePersonalInfoAllResponseRepository extends MongoRepository<PersonalInfoAllResponse, String> {

    Optional<PersonalInfoAllResponse> findByPIN(String pin);
}
