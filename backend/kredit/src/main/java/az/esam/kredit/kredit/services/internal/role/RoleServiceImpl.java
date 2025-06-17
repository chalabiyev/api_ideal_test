package az.esam.kredit.kredit.services.internal.role;

import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.repositories.RoleRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.internal.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Role createRole(ERole role) {
        if (roleRepository.existsByName(role)) {
            throw new IllegalArgumentException("Role already exists");
        }
        Role newRole = new Role(role);
        return roleRepository.save(newRole);
    }

    @Override
    public void deleteRole(ERole role) {
        Role existingRole = roleRepository.findByName(role)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
        roleRepository.delete(existingRole);
    }

    @Override
    public Optional<Role> getRole(ERole role) {
        return roleRepository.findByName(role);
    }

    @Override
    public void assignRoleToUser(String userId, ERole role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Role roleToAssign = roleRepository.findByName(role)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        if (!user.getRoles().contains(roleToAssign)) {
            user.getRoles().add(roleToAssign);
            userRepository.save(user);
        }
    }

    @Override
    public void removeRoleFromUser(String userId, ERole role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Role roleToRemove = roleRepository.findByName(role)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        if (user.getRoles().contains(roleToRemove)) {
            user.getRoles().remove(roleToRemove);
            userRepository.save(user);
        }
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Helper method to get roles by names, used for user creation and role assignment
    public Set<Role> getRolesByNames(Set<String> roleNames) {
        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            ERole roleEnum = ERole.valueOf(roleName); // Convert string to enum
            Role role = roleRepository.findByName(roleEnum)
                    .orElseThrow(() -> new IllegalArgumentException("Role " + roleName + " not found"));
            roles.add(role);
        }
        return roles;
    }

    @Override
    public Role getRoleByName(ERole role) {
        return roleRepository.findByName(role)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
    }
}
