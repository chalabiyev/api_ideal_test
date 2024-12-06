package az.esam.kredit.kredit.security.auth;

import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.requests.ChangeNameRequest;
import az.esam.kredit.kredit.dtos.requests.LoginRequest;
import az.esam.kredit.kredit.dtos.requests.RegisterRequest;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.sima.SimaCertPersonInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.util.List;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request) throws BadRequestException;

    AuthenticationResponse authenticate(LoginRequest request);

    AuthenticationResponse simaWeb2AppLogin(SimaCertPersonInfo person);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void logout(String username);

    User getUserByUsername(String username);

    List<User> findAll();

    boolean deleteMyAccount(String password, Authentication authentication);

    boolean delete(String id);

    User me(HttpServletRequest request);

    boolean changeName(ChangeNameRequest request, HttpServletRequest httpRequest, Authentication authentication) throws BadRequestException;
}
