package az.esam.kredit.kredit.security.auth;

import az.esam.kredit.kredit.dtos.requests.*;
import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
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
import az.esam.kredit.kredit.services.external.sms.SMSService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    SMSService smsService;

    @Autowired
    MongoTemplate mongoTemplate;

    private static final String ERROR_ROLE_IS_NOT_FOUND = "Error: Role is not found.";
    private static final String ROLE_ADMIN_STR = "ROLE_ADMIN";
    private static final String ERROR_USERNAME_IS_ALREADY_TAKEN = "Error: USERNAME is already taken!";

    @Override
    public AuthenticationResponse registerAdmin(RegisterRequest request) throws BadRequestException {
        try {
            var existingUser = userRepository.findFirstByUsername(request.getUsername())
                    .orElse(null);

            request.setPhoneNumber(request.getPhoneNumber()
                    .replace("(", "")
                    .replace(")", "")
                    .replace(" ", "")
                    .replace("-", "")
                    .replace("+", ""));
            if (!request.getPhoneNumber().startsWith("994")) {
                request.setPhoneNumber("994" + request.getPhoneNumber());
            }

            if (existingUser == null) {
                if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                    throw new BadRequestException("Error: Phone number is already taken!");
                }
                if (userRepository.existsByEmail(request.getEmail())) {
                    throw new BadRequestException("Error: Email is already taken!");
                }
            } else if (!existingUser.getStatus().equals(EUserStatus.DELETED)) {
                throw new BadRequestException(ERROR_USERNAME_IS_ALREADY_TAKEN);
            }

            var user = User.builder()
                    .username(request.getUsername())
                    .name(request.getName())
                    .surname(request.getSurName())
                    .fatherName(request.getFatherName())
                    .gender(request.getGender() != null ? EGender.valueOf(request.getGender().toUpperCase()) : null)
                    .phoneNumber(request.getPhoneNumber())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
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

            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND)));

            user.setRoles(roles);
            user.setLoggedIn(true);
            var savedUser = userRepository.save(user);

            UserDetails userDetails = UserDetailsImpl.build(savedUser);

            var jwtToken = jwtService.generateJwtToken(userDetails);
            var refreshToken = jwtService.generateRefreshToken(userDetails);
            saveUserToken(savedUser, jwtToken);

            return AuthenticationResponse.builder()
                    .id(savedUser.getId())
                    .username(savedUser.getUsername())
                    .photo(savedUser.getPhoto())
                    .email(savedUser.getEmail())
                    .phoneNumber(savedUser.getPhoneNumber())
                    .birthDate(savedUser.getBirthDate())
                    .roles(roles.stream().map(role -> role.getName().name()).toList())
                    .tokenType(TokenType.BEARER)
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .partners(savedUser.getPartners())
                    .build();

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public AuthenticationResponse register(RegisterRequest request, Authentication authentication)
            throws BadRequestException {
        try {
            var admin = authentication != null ? userRepository.findFirstByUsername(authentication.getName())
                    .orElse(null) : null;

            var existingUser = userRepository.findFirstByUsername(request.getUsername())
                    .orElse(null);

            if (request.getPhoneNumber() != null) {
                request.setPhoneNumber(request.getPhoneNumber()
                        .replace("(", "")
                        .replace(")", "")
                        .replace(" ", "")
                        .replace("-", "")
                        .replace("+", ""));
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
            } else if (!existingUser.getStatus().equals(EUserStatus.DELETED)
                    // existingUser role==partner and request role==partner
                    && ((existingUser.getRoles().stream().anyMatch(role -> role.getName().equals(ERole.ROLE_PARTNER))
                            && request.getRoles().contains("partner"))
                            || (existingUser.getRoles().stream().anyMatch(
                                    role -> role.getName().equals(ERole.ROLE_USER)) && request.getRoles() == null))) {
                // TODO: check role
                throw new BadRequestException(ERROR_USERNAME_IS_ALREADY_TAKEN);
            }

            String password = request.getPassword();
            if (password == null || password.isEmpty()) {
                password = UUID.randomUUID().toString();
            }

            var user = User.builder()
                    .username(request.getUsername())
                    .name(request.getName())
                    .surname(request.getSurName())
                    .fullName(request.getFullName())
                    .fatherName(request.getFatherName())
                    .gender(request.getGender() != null ? EGender.valueOf(request.getGender().toUpperCase()) : null)
                    .phoneNumber(request.getPhoneNumber())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(password))
                    .status(EUserStatus.ACTIVE)
                    .signUpDate(new Date())
                    .birthDate(request.getBirthDate())
                    .photo(request.getPhoto())
                    .departmentId(request.getDepartmentId())
                    .fullName(request.getFullName())
                    .voen(request.getVoen())
                    .organisationName(request.getOrganisation())
                    .title(request.getTitle())
                    .build();

            Set<String> strRoles = request.getRoles() == null ? new HashSet<>() : request.getRoles();
            Set<Role> roles;

            if (existingUser != null) {
                user.setId(existingUser.getId());
                user.setPartners(existingUser.getPartners());
                roles = existingUser.getRoles();
            } else {
                roles = new HashSet<>();
            }

            if (strRoles.isEmpty()) {
                Role studentRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));

                roles.add(studentRole);
                strRoles.add(studentRole.getName().name());
            } else {
                if (admin != null
                        && admin.getRoles().stream().anyMatch(role -> role.getName().equals(ERole.ROLE_ADMIN))) {
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
                            case "partner", "ROLE_PARTNER":
                                Role partner = roleRepository.findByName(ERole.ROLE_PARTNER)
                                        .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
                                roles.add(partner);

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
                } else {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new UsernameNotFoundException(ERROR_ROLE_IS_NOT_FOUND));
                    roles.add(userRole);
                }
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
                    .partners(savedUser.getPartners())
                    .voen(savedUser.getVoen())
                    .organisation(savedUser.getOrganisationName())
                    .title(savedUser.getTitle())
                    .build();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public AuthenticationResponse authenticate(LoginRequest request) {
        try {
            var user = userRepository.findFirstByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException(
                            "User Not Found with username: " + request.getUsername()));

            if (user.getStatus().equals(EUserStatus.DELETED)) {
                throw new UsernameNotFoundException("User not found! Deleted or not even exists");
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            var userDetails = (UserDetails) authentication.getPrincipal();

            String jwtToken = jwtService.generateJwtToken(authentication);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            List<String> rolesStr = (user).getRoles()
                    .stream()
                    .map(item -> item.getName().name())
                    .toList();

            // revokeAllUserTokens(user);
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
                    .partners(user.getPartners())
                    .voen(user.getVoen())
                    .organisation(user.getOrganisationName())
                    .title(user.getTitle())
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
                User user = userRepository.findFirstByUsername(username)
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
                            .partners(user.getPartners())
                            .voen(user.getVoen())
                            .organisation(user.getOrganisationName())
                            .title(user.getTitle())
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
            var user = userRepository.findFirstByUsername(username);
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
            return userRepository.findFirstByUsername(username)
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

            User user = userRepository.findFirstByUsername(authentication.getName())
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
            return userRepository.findFirstByUsername(username)
                    .orElseThrow(() -> new BadCredentialsException("User Not Found with username: " + username));
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        }
    }

    @Override
    public boolean changeName(ChangeNameRequest request, HttpServletRequest httpRequest, Authentication authentication)
            throws BadRequestException {
        try {
            User userExists = userRepository.findFirstByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User does not exists"));

            userExists.setFullName(request.getFullName());
            userRepository.save(userExists);
            return true;

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public AuthenticationResponse setPassword(SetPasswordRequest request, HttpServletRequest httpRequest,
            Authentication a) throws BadRequestException {
        try {
            var user = userRepository.findFirstByUsername(a.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (request.getNewPassword().equals(request.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepository.save(user);
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(),
                                request.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);

                var userDetails = (UserDetails) authentication.getPrincipal();

                String jwtToken = jwtService.generateJwtToken(authentication);
                String refreshToken = jwtService.generateRefreshToken(userDetails);

                List<String> rolesStr = (user).getRoles()
                        .stream()
                        .map(item -> item.getName().name())
                        .toList();

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
                        .partners(user.getPartners())
                        .voen(user.getVoen())
                        .organisation(user.getOrganisationName())
                        .title(user.getTitle())
                        .build();
            } else {
                throw new BadRequestException("Passwords do not match");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public Page<User> findAllUsers(int page, int size) {
        Role role = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        return findUsersByRoleIds(List.of(role.getId()), page, size);
    }

    @Override
    public Page<User> findManagementUsers(int page, int size) {
        List<Role> roles = roleRepository.findByNameIn(Arrays.asList(
                ERole.ROLE_ADMIN,
                ERole.ROLE_HR,
                ERole.ROLE_CREDIT_MANAGER,
                ERole.ROLE_ACCOUNTANT));
        if (roles.isEmpty()) {
            throw new IllegalArgumentException("Error: Roles are not found.");
        }
        List<String> roleIds = roles.stream()
                .map(Role::getId)
                .collect(Collectors.toList());
        return findUsersByRoleIds(roleIds, page, size);
    }

    @Override
    public Page<User> findAllPartnerUsers(int page, int size) {
        Role role = roleRepository.findByName(ERole.ROLE_PARTNER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        return findUsersByRoleIds(List.of(role.getId()), page, size);
    }

    @Override
    public Page<User> filterUsers(String search, String role, int page, int size) {
        Criteria criteria = new Criteria();

        if (search != null && !search.isEmpty()) {
            criteria.orOperator(
                    Criteria.where("name").regex(search, "i"),
                    Criteria.where("surname").regex(search, "i"),
                    Criteria.where("username").regex(search, "i"),
                    Criteria.where("phoneNumber").regex(search, "i"),
                    Criteria.where("email").regex(search, "i"),
                    Criteria.where("voen").regex(search, "i"),
                    Criteria.where("organisationName").regex(search, "i"),
                    Criteria.where("title").regex(search, "i"));
        }

        if (role != null && role.equalsIgnoreCase("users")) {
            Role r = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

            criteria.and("roles").in(r.getId());
        } else if (role != null && role.equalsIgnoreCase("management")) {
            List<Role> roles = roleRepository.findByNameIn(Arrays.asList(
                    ERole.ROLE_ADMIN,
                    ERole.ROLE_HR,
                    ERole.ROLE_CREDIT_MANAGER,
                    ERole.ROLE_ACCOUNTANT));
            if (roles.isEmpty()) {
                throw new IllegalArgumentException("Error: Roles are not found.");
            }
            List<String> roleIds = roles.stream()
                    .map(Role::getId)
                    .collect(Collectors.toList());
            criteria.and("roles").in(roleIds);
        } else if (role != null && role.equalsIgnoreCase("partners")) {
            Role r = roleRepository.findByName(ERole.ROLE_PARTNER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

            criteria.and("roles").in(r.getId());
        }

        Query query = new Query(criteria);

        // Pagination
        long total = mongoTemplate.count(query, User.class); // Total count for pagination
        query.skip((long) page * size).limit(size);

        // Fetch paginated results
        List<User> users = mongoTemplate.find(query, User.class);

        return new PageImpl<>(users, PageRequest.of(page, size), total);
    }

    public Page<User> findUsersByRoleIds(List<String> roleIds, int page, int size) {
        // Create the query
        Query query = new Query();
        query.addCriteria(Criteria.where("roles").in(roleIds));
        // order by signUp date
        query.with(Sort.by(Sort.Direction.DESC, "signUpDate"));

        // Pagination
        long total = mongoTemplate.count(query, User.class); // Total count for pagination
        query.skip((long) page * size).limit(size);

        // Fetch paginated results
        List<User> users = mongoTemplate.find(query, User.class);

        return new PageImpl<>(users, PageRequest.of(page, size), total);
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
    public AuthenticationResponse simaWeb2AppLogin(SimaCertPersonInfo person, FullIDCardInfoResponse idCard,
            String password) {
        String phoneNumber = person.getPhoneNumber()
                .replaceAll("\\+", "")
                .replaceAll("\\(", "")
                .replaceAll("\\)", "")
                .replaceAll(" ", "");
        Optional<User> findUser = userRepository.findFirstByUsername(person.getFinCode());
        if (findUser.isEmpty()) {
            findUser = userRepository.findFirstByPhoneNumber(phoneNumber);
        }
        if (findUser.isEmpty()) {
            try {
                // TODO: check if user exists with partner pin, then add partner role to user
                User existingUser = userRepository.findFirstByUsername(person.getFinCode()).orElse(null);
                if (existingUser != null) {
                    addRole(existingUser.getUsername(), ERole.ROLE_USER);
                    return authenticate(LoginRequest.builder()
                            .username(existingUser.getUsername())
                            .password(existingUser.getPassword()).build());
                } else {
                    RegisterRequest registerRequest = RegisterRequest.builder()
                            .fin(person.getFinCode())
                            .username(person.getFinCode())
                            .name(person.getName())
                            .surName(person.getSurName())
                            .password(password)
                            .fatherName(person.getFatherName())
                            .fullName(person.getFullName())
                            .phoneNumber(phoneNumber)
                            .organisation(person.getOrganisation())
                            .voen(person.getVoen())
                            .title(person.getTitle())
                            .build();
                    if (idCard != null) {
                        registerRequest.setSerialNumber(idCard.getDocumentNumber());
                        registerRequest.setAddress(idCard.getAddressDetail().getAddress());
                        registerRequest.setBirthDate(idCard.getBirthDate());
                        registerRequest.setCity(idCard.getAddressDetail().getRegionName());
                        registerRequest.setCountry(idCard.getNationality());
                        registerRequest.setGender(idCard.getGender());
                        registerRequest.setFamilyRelationship(idCard.getMaritalStatus());
                        registerRequest.setPhoto(idCard.getImage());
                    }
                    AuthenticationResponse response = register(registerRequest, null);
                    // TODO: sms gonder url?token=accessToken
                    smsService.sendSMSOneToN(SendSmsRequest.builder()
                            .message(
                                    "Sizin hesabınız uğurla yaradıldı. Şifrənizi yeniləmək üçün bu linkə keçid edin: \n"
                                            + "https://kabinet.idealkredit.az/setpassword?token="
                                            + response.getAccessToken()
                                            + " Link 24 saat ərzində aktivdir.")
                            .numbers(List.of(person.getPhoneNumber()))
                            .build());
                    return response;
                }
            } catch (BadRequestException ex) {
                log.error("simaWeb2AppLogin error : {}", ex);
            }
        } else {
            User savedUser = findUser.get();
            if (person.getFinCode() != null) {
                savedUser.setPin(person.getFinCode());
            }
            if (person.getTitle() != null) {
                savedUser.setTitle(person.getTitle());
            }
            if (person.getVoen() != null) {
                savedUser.setVoen(person.getVoen());
            }
            if (person.getOrganisation() != null) {
                savedUser.setOrganisationName(person.getOrganisation());
            }
            if (person.getFullName() != null) {
                savedUser.setFullName(person.getFullName());
            }
            if (idCard != null) {
                savedUser.setSeriaNo(idCard.getDocumentNumber());
                savedUser.setAddress(idCard.getAddressDetail().getAddress());
                savedUser.setBirthDate(idCard.getBirthDate());
                savedUser.setBirthAddress(idCard.getBirthAddress());
                savedUser.setNationality(idCard.getNationality());
                savedUser.setGender(idCard.getGender().equals("MALE") ? EGender.MALE : EGender.FEMALE);
                savedUser.setMaritalStatus(idCard.getMaritalStatus());
                savedUser.setPhoto(idCard.getImage());
                savedUser.setPhoneNumber(person.getPhoneNumber().replaceAll("\\+", "").replaceAll("\\(", "")
                        .replaceAll("\\)", "").replaceAll(" ", ""));
            }
            userRepository.save(savedUser);
            UserDetails userDetails = UserDetailsImpl.build(savedUser);
            var jwtToken = jwtService.generateJwtToken(userDetails);
            var refreshToken = jwtService.generateRefreshToken(userDetails);
            saveUserToken(savedUser, jwtToken);
            return AuthenticationResponse.builder()
                    .id(savedUser.getId())
                    .fullName(savedUser.getName().concat(" ").concat(savedUser.getSurname()))
                    .username(savedUser.getUsername())
                    .photo(savedUser.getPhoto())
                    .email(savedUser.getEmail())
                    .phoneNumber(savedUser.getPhoneNumber())
                    .birthDate(savedUser.getBirthDate())
                    .roles(savedUser.getRoles().stream().map(role -> role.getName().name()).toList())
                    .tokenType(TokenType.BEARER)
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .partners(savedUser.getPartners())
                    .voen(savedUser.getVoen())
                    .organisation(savedUser.getOrganisationName())
                    .title(savedUser.getTitle())
                    .build();
        }

        return null;
    }

    @Override
    public User addRole(String username, ERole role) {
        User user = userRepository.findFirstByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        Role roleToAdd = roleRepository.findByName(role)
                .orElseThrow(() -> new UsernameNotFoundException("Role not found!"));
        // if user already has the role, return user
        if (user.getRoles().stream().anyMatch(r -> r.getName().equals(role))) {
            return user;
        }
        user.getRoles().add(roleToAdd);
        return userRepository.save(user);
    }
}
