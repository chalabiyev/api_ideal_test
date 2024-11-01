package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByLastLoginDate(Date lastLoginDate);

    List<User> findByRoles(Role role);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
