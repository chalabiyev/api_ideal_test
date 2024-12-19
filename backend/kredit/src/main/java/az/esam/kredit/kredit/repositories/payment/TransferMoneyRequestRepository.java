package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.requests.payment.TransferMoneyRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransferMoneyRequestRepository extends MongoRepository<TransferMoneyRequest, String> {
}
