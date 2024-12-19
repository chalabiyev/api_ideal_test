package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.responses.payment.CardRegistrationResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CardRegistrationResponseRepository extends MongoRepository<CardRegistrationResponse, String> {
}
