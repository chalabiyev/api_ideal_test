package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.responses.payment.TransferMoneyResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransferMoneyResponseRepository extends MongoRepository<TransferMoneyResponse, String> {
}
