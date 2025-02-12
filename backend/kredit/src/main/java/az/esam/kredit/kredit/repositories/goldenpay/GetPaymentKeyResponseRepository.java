package az.esam.kredit.kredit.repositories.goldenpay;

import az.esam.kredit.kredit.dtos.responses.goldenpay.GetPaymentKeyResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GetPaymentKeyResponseRepository extends MongoRepository<GetPaymentKeyResponse, String> {
    GetPaymentKeyResponse findByPaymentKey(String paymentKey);
}
