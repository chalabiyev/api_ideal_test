package az.esam.kredit.kredit.services.internal.user;

import az.esam.kredit.kredit.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    User updateUser(User user);

    void deleteUser(String userId);

    List<User> getAllUsers();

    Optional<User> getUserById(String userId);

    boolean emailExists(String email);
}
