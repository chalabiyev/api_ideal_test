package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.responses.payment.PaymentStatusResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentStatusResponseRepository extends MongoRepository<PaymentStatusResponse, String> {

    void deleteById(@NotNull String id);

}
