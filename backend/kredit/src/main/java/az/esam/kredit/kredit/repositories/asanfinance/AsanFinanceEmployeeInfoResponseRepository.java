package az.esam.kredit.kredit.repositories.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface AsanFinanceEmployeeInfoResponseRepository extends MongoRepository<EmployeeInfoResponse, String> {
    @Query("{'Pin': ?0}")
    Optional<EmployeeInfoResponse> findByPin(String Pin);
}
