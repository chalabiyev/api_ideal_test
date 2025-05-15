package az.esam.kredit.kredit.dtos.responses;

import az.esam.kredit.kredit.entities.Partner;
import az.esam.kredit.kredit.entities.enums.TokenType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;
import java.util.Set;

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
    private Set<Partner> partners;
    private String organisation;
    private String voen;
    private String title;
    private String tokenId;
}
