package az.esam.kredit.kredit.repositories.goldenpay;

import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentResultResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GetPaymentResultResponseRepository extends MongoRepository<GetPaymentResultResponse, String> {
    GetPaymentResultResponse findByPaymentKey(String paymentKey);
}
