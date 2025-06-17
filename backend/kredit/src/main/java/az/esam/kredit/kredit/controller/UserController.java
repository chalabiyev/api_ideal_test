package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.services.internal.user.UserService;
import az.esam.kredit.kredit.services.internal.role.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@CrossOrigin(origins = { "*" }, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user, Authentication authentication) {
        // Convert the role names (e.g., ["ROLE_ADMIN"]) into ERoles
        Set<Role> userRoles = user.getRoles().stream()
                .map(role -> {
                    try {
                        // Extract the role name from the Role object and convert to ERole enum
                        String roleName = role.getName().name();
                        ERole roleEnum = ERole.valueOf(roleName);

                        return roleService.getRoleByName(roleEnum);
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Invalid role: " + role.getName());
                    }
                })
                .collect(Collectors.toSet());

        if (userRoles.isEmpty()) {
            throw new IllegalArgumentException("No valid roles found");
        }

        user.setRoles(userRoles);
        User createdUser = userService.createUser(user);

        return ResponseEntity.ok(createdUser);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user, Authentication authentication) {
        Set<Role> userRoles = user.getRoles().stream()
                .map(role -> {
                    try {
                        String roleName = role.getName().name();
                        ERole roleEnum = ERole.valueOf(roleName);

                        return roleService.getRoleByName(roleEnum);
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Invalid role: " + role.getName()); // Handle invalid roles
                    }
                })
                .collect(Collectors.toSet());

        user.setRoles(userRoles);
        User updatedUser = userService.updateUser(user);

        return ResponseEntity.ok(updatedUser);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId, Authentication authentication) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/list")
    public ResponseEntity<List<User>> getAllUsers(Authentication authentication) {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/get/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId, Authentication authentication) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        User user = userService.getUserById(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return ResponseEntity.ok(user);
    }
}
