package az.esam.kredit.kredit.dtos;

import az.esam.kredit.kredit.entities.TokenType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class AuthenticationResponse {

    private String accessToken;
    private String refreshToken;
    private TokenType tokenType;
    private String id;
    private String photo;
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
    private Date birthDate;
    private List<String> roles;
}
