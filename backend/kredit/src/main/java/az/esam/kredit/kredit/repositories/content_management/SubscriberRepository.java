package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.Subscriber;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriberRepository extends MongoRepository<Subscriber, String> {

    List<Subscriber> findAllByActiveTrue();

    Optional<Subscriber> findByEmail(String email);

    boolean existsByEmail(String email);
}
