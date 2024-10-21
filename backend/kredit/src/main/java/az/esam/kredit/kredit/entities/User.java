package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.documents.IDCardInfo;
import az.esam.kredit.kredit.entities.documents.MigrationDocumentInfo;
import az.esam.kredit.kredit.entities.documents.PassportDocumentInfo;
import az.esam.kredit.kredit.entities.enums.EUserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "users")
public class User extends BaseEntity {

    @Id
    private String id;

    @Indexed(unique = true)
    @NotBlank
    @Size(max = 100)
    private String username;

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Size(max = 120)
    private String surname;

    @NotBlank
    @Size(max = 120)
    private String fullName;

    @NotBlank
    @Size(max = 120)
    private String fatherName;

    @NotBlank
    @Size(max = 50)
    private String gender;

    @NotBlank
    @Size(max = 20)
    @Indexed(unique = true)
    private String phoneNumber;

    @Indexed(unique = true)
    @Email
    private String email;

    @DBRef
    PassportDocumentInfo passportDocumentInfo;

    @DBRef
    IDCardInfo idCardInfo;

    @DBRef
    MigrationDocumentInfo migrationDocumentInfo;

    @NotBlank
    private String password;
    private Date lastLoginDate;
    private boolean loggedIn;

    @DBRef
    private Set<Role> roles;

    @DBRef
    private List<Token> tokens;

    private EUserStatus status;

    private Date signUpDate;

    private String departmentId;
}
