package az.esam.kredit.kredit.security.auth;

import az.esam.kredit.kredit.dtos.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.ChangeNameRequest;
import az.esam.kredit.kredit.dtos.LoginRequest;
import az.esam.kredit.kredit.dtos.RegisterRequest;
import az.esam.kredit.kredit.entities.ERole;
import az.esam.kredit.kredit.entities.EUserStatus;
import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.Token;
import az.esam.kredit.kredit.entities.TokenType;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.repos.RoleRepository;
import az.esam.kredit.kredit.repos.TokenRepository;
import az.esam.kredit.kredit.repos.UserRepository;
import az.esam.kredit.kredit.security.jwt.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    private static final String ERROR_ROLE_IS_NOT_FOUND = "Error: Role is not found.";
    private static final String ROLE_ADMIN_STR = "ROLE_ADMIN";
    private static final String ERROR_USERNAME_IS_ALREADY_TAKEN = "Error: USERNAME is already taken!";

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var existingUser = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        request.setPhoneNumber(request.getPhoneNumber()
                .replace("(", "")
                .replace(")", "")
                .replace(" ", "")
                .replace("-", "")
                .replace("+", "")
        );
        if (!request.getPhoneNumber().startsWith("994")) {
            request.setPhoneNumber("994" + request.getPhoneNumber());
        }

        if (existingUser == null) {
            if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                throw new UsernameNotFoundException("Error: Phone number is already taken!");
            }
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new UsernameNotFoundException("Error: Email is already taken!");
            }
        } else if (!existingUser.getStatus().equals(EUserStatus.DELETED)) {
            throw new UsernameNotFoundException(ERROR_USERNAME_IS_ALREADY_TAKEN);
        }

        var user = User.builder()
                .phoneNumber(request.getPhoneNumber())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .status(EUserStatus.ACTIVE)
                .signUpDate(new Date())
                .birthDate(request.getBirthDate())
                .fullName(request.getFullName())
                .build();

        if (existingUser != null) {
            user.setId(existingUser.getId());
        }

        Set<String> strRoles = request.getRoles() == null ? new HashSet<>() : request.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles.isEmpty()) {
            Role studentRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));

            roles.add(studentRole);
            strRoles.add(studentRole.getName().name());
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin", ROLE_ADMIN_STR:
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(adminRole);

                        break;
                    case "manager", "ROLE_MANAGER":
                        Role manager = roleRepository.findByName(ERole.ROLE_MANAGER)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(manager);

                        break;
                    case "operator", "ROLE_OPERATOR":
                        Role operator = roleRepository.findByName(ERole.ROLE_OPERATOR)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(operator);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        user.setLoggedIn(true);
        var savedUser = userRepository.save(user);

        UserDetails userDetails = UserDetailsImpl.build(savedUser);

        var jwtToken = jwtService.generateJwtToken(userDetails);
        var refreshToken = jwtService.generateRefreshToken(userDetails);
        saveUserToken(savedUser, jwtToken);

        return AuthenticationResponse.builder()
                .id(savedUser.getId())
                .fullName(savedUser.getFullName())
                .username(savedUser.getUsername())
                .photo(savedUser.getPhoto())
                .email(savedUser.getEmail())
                .phoneNumber(savedUser.getPhoneNumber())
                .birthDate(savedUser.getBirthDate())
                .roles(strRoles.stream().toList())
                .tokenType(TokenType.BEARER)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(LoginRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + request.getUsername()));

        if (user.getStatus().equals(EUserStatus.DELETED)) {
            throw new UsernameNotFoundException("User not found! Deleted or not even exists");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtService.generateJwtToken(authentication);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        List<String> rolesStr = (user).getRoles()
                .stream()
                .map(item -> item.getName().name())
                .toList();

        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        userRepository.save(user);

        return AuthenticationResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .roles(rolesStr)
                .photo(user.getPhoto())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .birthDate(user.getBirthDate())
                .tokenType(TokenType.BEARER)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

            UserDetails userDetails = UserDetailsImpl.build(user);
            List<String> roles = user.getRoles()
                    .stream()
                    .map(item -> item.getName().name())
                    .toList();

            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                var accessToken = jwtService.generateJwtToken(userDetails);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                var authenticationResponse = AuthenticationResponse.builder()
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .username(user.getUsername())
                        .roles(roles)
                        .tokenType(TokenType.BEARER)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();

                new ObjectMapper().writeValue(response.getOutputStream(), authenticationResponse);
            }
        }
    }

    @Override
    public void logout(String username) {
        var user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            User usr = user.get();
            revokeAllUserTokens(usr);
            usr.setLoggedIn(false);
            userRepository.save(usr);
        }
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public boolean deleteMyAccount(String password, Authentication authentication) {
        try {
            if (authentication == null) {
                throw new UsernameNotFoundException("User not found!");
            }

            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
            if (passwordEncoder.matches(password, user.getPassword())) {
                user.setStatus(EUserStatus.DELETED);
                revokeAllUserTokens(user);
                userRepository.save(user);
                log.info("User deleted : {}", authentication.getName());
                return true;
            } else {
                throw new RuntimeException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    @Override
    public boolean delete(String id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public User me(HttpServletRequest request) {
        String username = jwtService.extractUsername(request.getHeader("Authorization").substring(7));
        return userRepository.findByUsername(username)
                .orElseThrow(()
                        -> new UsernameNotFoundException("User Not Found with username: " + username));
    }

    @Override
    public boolean changeName(ChangeNameRequest request, HttpServletRequest httpRequest, Authentication authentication) {
        try {
            User userExists = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User does not exists"));

            userExists.setFullName(request.getFullName());
            userRepository.save(userExists);
            return true;

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .user(user)
                .build();

        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }

        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
            tokenRepository.save(token);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
