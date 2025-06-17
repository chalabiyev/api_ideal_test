package az.esam.kredit.kredit.services.internal.role;

import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.enums.ERole;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface RoleService {

    Role createRole(ERole role);

    void deleteRole(ERole role);

    Optional<Role> getRole(ERole role);

    void assignRoleToUser(String userId, ERole role);

    void removeRoleFromUser(String userId, ERole role);

    List<Role> getAllRoles();

    Set<Role> getRolesByNames(Set<String> roleNames);

    Role getRoleByName(ERole name);
}
