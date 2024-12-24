package az.esam.kredit.kredit.security.auth;

import az.esam.kredit.kredit.dtos.requests.SetPasswordRequest;
import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.requests.ChangeNameRequest;
import az.esam.kredit.kredit.dtos.requests.LoginRequest;
import az.esam.kredit.kredit.dtos.requests.RegisterRequest;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.entities.sima.SimaCertPersonInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.util.List;

public interface AuthenticationService {

    AuthenticationResponse registerAdmin(RegisterRequest registerRequest) throws BadRequestException;

    AuthenticationResponse register(RegisterRequest request, Authentication authentication) throws BadRequestException;

    AuthenticationResponse authenticate(LoginRequest request);

    AuthenticationResponse simaWeb2AppLogin(SimaCertPersonInfo person, FullIDCardInfoResponse idCard, String password);

    User addRole(String username, ERole role);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void logout(String username);

    User getUserByUsername(String username);

    List<User> findAll();

    boolean deleteMyAccount(String password, Authentication authentication);

    boolean delete(String id);

    User me(HttpServletRequest request);

    boolean changeName(ChangeNameRequest request, HttpServletRequest httpRequest, Authentication authentication) throws BadRequestException;

    AuthenticationResponse setPassword(@Valid SetPasswordRequest request, HttpServletRequest httpRequest, Authentication authentication) throws BadRequestException;
}
