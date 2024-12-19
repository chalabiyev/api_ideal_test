package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.requests.payment.CardRegistrationWithPayRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CardRegistrationWithPayRequestRepository extends MongoRepository<CardRegistrationWithPayRequest, String> {
}
