package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findFirstByUsername(String username);

    Optional<User> findByUsernameAndRoles(String username, Role role);

    Boolean existsByUsername(String username);

    Optional<User> findFirstByPhoneNumber(String phoneNumber);

    Optional<User> findByPhoneNumberAndRoles(String phoneNumber, Role role);

    Boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByLastLoginDate(Date lastLoginDate);

    List<User> findByRoles(Role role);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findByPin(String pin);
}
