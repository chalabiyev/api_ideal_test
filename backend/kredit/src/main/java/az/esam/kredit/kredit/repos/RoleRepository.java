package az.esam.kredit.kredit.repos;

import az.esam.kredit.kredit.entities.ERole;
import az.esam.kredit.kredit.entities.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByName(ERole name);

    boolean existsByName(ERole eRole);
}
