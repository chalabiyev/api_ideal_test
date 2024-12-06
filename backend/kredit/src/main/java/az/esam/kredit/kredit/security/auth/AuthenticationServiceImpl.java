package az.esam.kredit.kredit.security.auth;

import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.requests.ChangeNameRequest;
import az.esam.kredit.kredit.dtos.requests.LoginRequest;
import az.esam.kredit.kredit.dtos.requests.RegisterRequest;
import az.esam.kredit.kredit.entities.enums.EGender;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.entities.enums.EUserStatus;
import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.Token;
import az.esam.kredit.kredit.entities.enums.TokenType;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.sima.SimaCertPersonInfo;
import az.esam.kredit.kredit.repositories.RoleRepository;
import az.esam.kredit.kredit.repositories.TokenRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.security.jwt.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

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
    public AuthenticationResponse register(RegisterRequest request) throws BadRequestException {
        try {
            var existingUser = userRepository.findByUsername(request.getUsername())
                    .orElse(null);

            if (request.getPhoneNumber() != null) {
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
            }

            if (existingUser == null) {
                if (request.getPhoneNumber() != null && userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                    throw new BadRequestException("Error: Phone number is already taken!");
                }
                if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
                    throw new BadRequestException("Error: Email is already taken!");
                }
            } else if (!existingUser.getStatus().equals(EUserStatus.DELETED)) {
                throw new BadRequestException(ERROR_USERNAME_IS_ALREADY_TAKEN);
            }

            var user = User.builder()
                    .username(request.getUsername())
                    .name(request.getName())
                    .surname(request.getSurName())
                    .fullName(request.getName().concat(" ").concat(request.getSurName()))
                    .fatherName(request.getFatherName())
                    .gender(request.getGender() != null ? EGender.valueOf(request.getGender().toUpperCase()) : null)
                    .phoneNumber(request.getPhoneNumber())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .status(EUserStatus.ACTIVE)
                    .signUpDate(new Date())
                    .birthDate(request.getBirthDate())
                    .photo(request.getPhoto())
                    .departmentId(request.getDepartmentId())
                    .fullName(request.getFullName())
                    .build();

            if (existingUser != null) {
                user.setId(existingUser.getId());
            }

            Set<String> strRoles = request.getRoles() == null ? new HashSet<>() : request.getRoles();
            Set<Role> roles = new HashSet<>();

            if (strRoles.isEmpty()) {
                Role studentRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));

                roles.add(studentRole);
                strRoles.add(studentRole.getName().name());
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin", ROLE_ADMIN_STR:
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
                            roles.add(adminRole);

                            break;
                        case "hr", "ROLE_HR":
                            Role hr = roleRepository.findByName(ERole.ROLE_HR)
                                    .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
                            roles.add(hr);

                            break;
                        case "credit_manager", "ROLE_CREDIT_MANAGER":
                            Role credit_manager = roleRepository.findByName(ERole.ROLE_CREDIT_MANAGER)
                                    .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
                            roles.add(credit_manager);

                            break;
                        case "accountant", "ROLE_ACCOUNTANT":
                            Role accountant = roleRepository.findByName(ERole.ROLE_ACCOUNTANT)
                                    .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
                            roles.add(accountant);

                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
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
                    .roles(roles.stream().map(role -> role.getName().name()).toList())
                    .tokenType(TokenType.BEARER)
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public AuthenticationResponse authenticate(LoginRequest request) {
        try {
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
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
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
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    @Override
    public void logout(String username) {
        try {
            var user = userRepository.findByUsername(username);
            if (user.isPresent()) {
                User usr = user.get();
                revokeAllUserTokens(usr);
                usr.setLoggedIn(false);
                userRepository.save(usr);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    @Override
    public User getUserByUsername(String username) {
        try {
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<User> findAll() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    @Override
    public boolean deleteMyAccount(String password, Authentication authentication) {
        try {
            if (authentication == null) {
                throw new BadCredentialsException("User not found!");
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
                throw new BadCredentialsException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadCredentialsException(e.getMessage());
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
        try {
            String username = jwtService.extractUsername(request.getHeader("Authorization").substring(7));
            return userRepository.findByUsername(username)
                    .orElseThrow(()
                            -> new BadCredentialsException("User Not Found with username: " + username));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        }
    }

    @Override
    public boolean changeName(ChangeNameRequest request, HttpServletRequest httpRequest, Authentication authentication) throws BadRequestException {
        try {
            User userExists = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User does not exists"));

            userExists.setFullName(request.getFullName());
            userRepository.save(userExists);
            return true;

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
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

    @Override
    public AuthenticationResponse simaWeb2AppLogin(SimaCertPersonInfo person) {
        Optional<User> findUser = userRepository.findByUsername(person.getFinCode());
        if (findUser.isEmpty()) {
            try {
                RegisterRequest registerRequest = RegisterRequest.builder()
                        .fin(person.getFinCode())
                        .username(person.getFinCode())
                        .name(person.getName())
                        .surName(person.getSurName())
                        .fatherName(person.getFatherName()).build();
                return register(registerRequest);
            } catch (BadRequestException ex) {
            }
        } else {
            User savedUser = findUser.get();
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
                    .roles(savedUser.getRoles().stream().map(role -> role.getName().name()).toList())
                    .tokenType(TokenType.BEARER)
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        }

        return null;
    }
}
