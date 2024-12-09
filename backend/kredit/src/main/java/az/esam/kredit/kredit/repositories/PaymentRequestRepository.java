package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.dtos.requests.payment.PaymentRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRequestRepository extends MongoRepository<PaymentRequest, String> {

    void deleteById(@NotNull String id);

}
