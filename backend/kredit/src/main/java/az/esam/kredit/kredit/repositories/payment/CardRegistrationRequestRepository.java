package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.requests.payment.CardRegistrationRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CardRegistrationRequestRepository extends MongoRepository<CardRegistrationRequest, String> {
}
