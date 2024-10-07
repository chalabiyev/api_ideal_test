package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.ChangeEmailRequest;
import az.esam.kredit.kredit.dtos.ChangeNameRequest;
import az.esam.kredit.kredit.dtos.ChangePasswordRequest;
import az.esam.kredit.kredit.dtos.ChangePhoneRequest;
import az.esam.kredit.kredit.dtos.LoginRequest;
import az.esam.kredit.kredit.dtos.MessageResponse;
import az.esam.kredit.kredit.dtos.OTPRequest;
import az.esam.kredit.kredit.dtos.PasswordResetRequest;
import az.esam.kredit.kredit.dtos.RegisterRequest;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.entities.Role;
import az.esam.kredit.kredit.otp.OTPService;
import az.esam.kredit.kredit.repos.RoleRepository;
import az.esam.kredit.kredit.repos.UserRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.storage.StorageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
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
            roleRepository.insert(new Role(ERole.ROLE_HR));
            roleRepository.insert(new Role(ERole.ROLE_CREDIT_MANAGER));
            roleRepository.insert(new Role(ERole.ROLE_ACCOUNTANT));
        }

        if (userRepository.findAll().isEmpty()) {
            try {
                authenticationService.register(RegisterRequest.builder()
                        .password("123456")
                        .username(ADMIN_USER_NAME)
                        .email("admin@admin.com")
                        .fullName(ADMIN_USER_NAME)
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
            HttpServletRequest httpRequest) {
        try {
            AuthenticationResponse response = authenticationService.register(registerRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PostMapping("/login")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest httpRequest
    ) {
        try {
            AuthenticationResponse response = authenticationService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PostMapping("/refresh-token")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        try {
            authenticationService.refreshToken(request, response);
            return ResponseEntity.status(200).body("Token refreshed successfully");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken() {
        try {
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/deleteAccount/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable String id) {
        try {
            if (authenticationService.delete(id)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Account deleted successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, "User not found"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
        }
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @GetMapping("/deleteMyAccount")
    public ResponseEntity<?> deleteMyAccount(@RequestParam String password, Authentication authentication) {
        try {
            if (authenticationService.deleteMyAccount(password, authentication)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Account deleted successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, "User not found"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
        }
    }

    // TODO change path variable to request param
    @PostMapping("/send-otp/{isPhone}")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> sendOtpCode(
            @Valid @RequestBody OTPRequest request,
            @PathVariable boolean isPhone,
            HttpServletRequest httpRequest) {
        try {
            if (otpService.sendOtp(request, isPhone)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "OTP sent successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "OTP not sent"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PostMapping("/change-password")
    @SecurityRequirement(name = "authentication")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest
    ) {
        try {
            if (otpService.changePassword(request, httpRequest, authentication)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Password changed successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Password not changed"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PostMapping("/change-email")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> changeEmail(
            @Valid @RequestBody ChangeEmailRequest request,
            HttpServletRequest httpRequest
    ) {
        try {
            if (otpService.changeEmail(request, httpRequest)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Email changed successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Email not changed"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PostMapping("/change-fullName")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> changeFullName(
            @Valid @RequestBody ChangeNameRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest
    ) {
        try {
            if (authenticationService.changeName(request, httpRequest, authentication)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Full name changed successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Full name not changed"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PostMapping("/change-phone")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> changePhone(
            @Valid @RequestBody ChangePhoneRequest request,
            HttpServletRequest httpRequest
    ) {
        try {
            if (otpService.changePhone(request, httpRequest)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Phone changed successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Phone not changed"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PostMapping("/reset-password/{isPhone}")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> resetPassword(
            @Valid @RequestBody PasswordResetRequest request,
            @PathVariable boolean isPhone,
            HttpServletRequest httpRequest
    ) {
        try {
            if (otpService.resetPassword(request, httpRequest, isPhone)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new MessageResponse(HttpStatus.OK, "Password reset successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Password not reset"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> listUsers() {
        try {
            return ResponseEntity.ok(userRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @PostMapping("/setUserPhoto")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            var user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            String fileName = authentication.getName().concat(".jpg");
            storageService.store(file, fileName);
            user.setPhoto(fileName);
            userRepository.save(user);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MessageResponse(HttpStatus.OK, fileName));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
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
    public ResponseEntity<?> me(HttpServletRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.me(request));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
        }
    }
}
