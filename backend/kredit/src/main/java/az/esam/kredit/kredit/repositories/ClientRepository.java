package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Client;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {

    Optional<Client> findByName(String name);

    Optional<Client> findByIpAddress(String ipAddress);

    Boolean existsByName(String name);

}
