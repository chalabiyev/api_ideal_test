package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.requests.*;
import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.responses.MessageResponse;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.entities.enums.EPlatform;
import az.esam.kredit.kredit.helper.Helper;
import az.esam.kredit.kredit.services.internal.otp.OTPService;
import az.esam.kredit.kredit.repositories.RoleRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Slf4j
@CrossOrigin(origins = { "*" }, maxAge = 3600)
@RestController
@Validated
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    OTPService otpService;

    @Autowired
    StorageService storageService;

    private static final String ADMIN_USER_NAME = "admin";

    private static final String ATTACHMENT_FILENAME = "attachment; filename=\"";
    private static final String COULD_NOT_DETERMINE_FILE_TYPE = "Could not determine file type.";

    @PostConstruct
    void init() {
        if (roleRepository.findAll().isEmpty()) {
            roleRepository.insert(new Role(ERole.ROLE_ADMIN));
            roleRepository.insert(new Role(ERole.ROLE_USER));
            roleRepository.insert(new Role(ERole.ROLE_SITE_MANAGER));
            roleRepository.insert(new Role(ERole.ROLE_CREDIT_MANAGER));
            roleRepository.insert(new Role(ERole.ROLE_ACCOUNTANT));
            roleRepository.insert(new Role(ERole.ROLE_PARTNER));
        }

        if (userRepository.findAll().isEmpty()) {
            try {
                authenticationService.registerAdmin(RegisterRequest.builder()
                        .password("123456")
                        .username(ADMIN_USER_NAME)
                        .email("admin@admin.com")
                        .fullName(ADMIN_USER_NAME)
                        .name(ADMIN_USER_NAME)
                        .surName(ADMIN_USER_NAME)
                        .gender("MALE")
                        .roles(new HashSet<>(List.of(ADMIN_USER_NAME)))
                        .phoneNumber("994504809988")
                        .build());
            } catch (Exception ex) {
                log.info(null, ex, Level.SEVERE);
            }
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/create")
    public ResponseEntity<AuthenticationResponse> create(
            @Valid @RequestBody RegisterRequest registerRequest,
            HttpServletRequest httpRequest,
            Authentication authentication) throws BadRequestException {
        AuthenticationResponse response = authenticationService.register(registerRequest, authentication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest httpRequest) {
        AuthenticationResponse response = authenticationService.authenticate(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
        return ResponseEntity.status(200).body("Token refreshed successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken() {
        return ResponseEntity.ok(true);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/deleteAccount/{id}")
    public ResponseEntity<Boolean> deleteAccount(@PathVariable String id) {
        if (authenticationService.delete(id)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadCredentialsException("User not found");
        }
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/deleteMyAccount")
    public ResponseEntity<Boolean> deleteMyAccount(@RequestParam String password, Authentication authentication) {
        if (authenticationService.deleteMyAccount(password, authentication)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadCredentialsException("User not found");
        }
    }

    @PostMapping("/send-otp")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> sendOtpCode(
            @Valid @RequestBody OTPRequest request,
            @RequestParam @NotBlank(message = "Platforma tipi boş ola bilməz") String platform,
            HttpServletRequest httpRequest) throws BadRequestException {
        request.setIpAddress(Helper.getClientIpAddress(httpRequest));
        if (otpService.sendOtp(request, platform.toUpperCase())) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("OTP not sent");
        }
    }

    @PostMapping("/validate-otp")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> validateOtpCode(
            @Valid @RequestBody OTPValidateRequest request,
            @RequestParam @NotBlank(message = "Platforma tipi boş ola bilməz") String platform,
            HttpServletRequest httpRequest) throws BadRequestException {
        request.setIpAddress(Helper.getClientIpAddress(httpRequest));
        if (otpService.validateOTP(request.getContact(), request.getOtpCode(),
                EPlatform.valueOf(platform.toUpperCase()))) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("OTP not valid");
        }
    }

    @PostMapping("/change-password")
    @SecurityRequirement(name = "authentication")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) throws BadRequestException {
        if (otpService.changePassword(request, httpRequest, authentication)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("Password not changed");
        }
    }

    @PostMapping("/set-password")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<AuthenticationResponse> setPassword(
            @Valid @RequestBody SetPasswordRequest request,
            HttpServletRequest httpRequest, @RequestParam String token) throws BadRequestException {

        return ResponseEntity.ok(authenticationService.setPassword(request, httpRequest, token));
    }

    @PostMapping("/change-email")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> changeEmail(
            @Valid @RequestBody ChangeEmailRequest request,
            HttpServletRequest httpRequest) throws BadRequestException {
        if (otpService.changeEmail(request, httpRequest)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("Email not changed");
        }
    }

    @PostMapping("/change-fullName")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> changeFullName(
            @Valid @RequestBody ChangeNameRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) throws BadRequestException {
        if (authenticationService.changeName(request, httpRequest, authentication)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("Full name not changed");
        }
    }

    @PostMapping("/change-phone")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> changePhone(
            @Valid @RequestBody ChangePhoneRequest request,
            HttpServletRequest httpRequest) throws BadRequestException {
        if (otpService.changePhone(request, httpRequest)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("Phone not changed");
        }
    }

    @PostMapping("/reset-password")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> resetPassword(
            @Valid @RequestBody PasswordResetRequest request,
            @RequestParam @NotBlank(message = "Platforma tipi boş ola bilməz") String platform,
            HttpServletRequest httpRequest) throws BadRequestException {
        if (otpService.resetPassword(request, httpRequest, platform.toUpperCase())) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(true);
        } else {
            throw new BadRequestException("Password not reset");
        }
    }

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/setUserPhoto")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, Authentication authentication) {
        var user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String fileName = authentication.getName().concat(".jpg");
        storageService.store(file, fileName);
        user.setPhoto(fileName);
        userRepository.save(user);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MessageResponse(HttpStatus.OK, fileName));
    }

    @GetMapping("/getUserPhoto/{photoName}")
    @SecurityRequirement(name = "X-API-KEY")
    @ResponseBody
    public ResponseEntity<?> serveFile(@PathVariable String photoName, HttpServletRequest request) {
        try {
            Resource file = storageService.loadAsResource(photoName);
            if (file == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .build();
            }
            // Try to determine file's content type
            String contentType = null;
            try {
                contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
            } catch (IOException ex) {
                Logger.getLogger(AuthController.class.getName()).info("Could not determine file type.");
                throw new RuntimeException(ex.getMessage());
            }

            // Fallback to the default content type if type could not be determined
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/me")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<User> me(HttpServletRequest request) {
        return ResponseEntity.ok(authenticationService.me(request));
    }

    @GetMapping("/getUserByUserName/{userName}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<User> getUserByUserName(@PathVariable("userName") String userName) {
        return ResponseEntity.ok(authenticationService.getUserByUsername(userName));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/listUsers")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<Page<User>> findAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(authenticationService.findAllUsers(page, size));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/listPartnerUsers")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<Page<User>> listPartnerUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(authenticationService.findAllPartnerUsers(page, size));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('IT_MANAGER')")
    @GetMapping("/listManagements")
    @SecurityRequirement(name = "authentication")
    public ResponseEntity<Page<User>> findAllManagements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(authenticationService.findManagementUsers(page, size));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/filterUsers")
    public Page<User> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return authenticationService.filterUsers(search, role, page, size);
    }
}
