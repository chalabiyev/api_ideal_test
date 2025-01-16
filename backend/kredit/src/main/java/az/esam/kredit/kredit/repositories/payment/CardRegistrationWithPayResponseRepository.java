package az.esam.kredit.kredit.repositories.payment;

import az.esam.kredit.kredit.dtos.responses.payment.CardRegistrationWithPayResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CardRegistrationWithPayResponseRepository extends MongoRepository<CardRegistrationWithPayResponse, String> {
}
