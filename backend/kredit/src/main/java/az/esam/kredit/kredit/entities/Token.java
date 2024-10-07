package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.TokenType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("tokens")
public class Token {
    @Id
    public String id;

    @Indexed(unique = true)
    public String token;
    @Builder.Default
    public TokenType tokenType = TokenType.BEARER;
    public boolean revoked;
    public boolean expired;
    @DBRef
    private User user;
}