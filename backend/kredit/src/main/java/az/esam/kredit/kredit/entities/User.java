package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.EGender;
import az.esam.kredit.kredit.entities.enums.EOwnerType;
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

import java.util.*;

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

    //    @NotBlank
    @Size(max = 50)
    private EGender gender;

    //    @NotBlank
    @Size(max = 20)
    @Indexed(unique = true)
    private String phoneNumber;

    @Indexed(unique = true)
    @Email
    private String email;

    private String pin;
    private String seriaNo;
    private Date eventDate;
    private Date expDate;
    private String address;
    private String organisationName;
    private Date activationDate;
    private String birthAddress;
    private String nationality;
    private String maritalStatus;

    private String factAddress;
    private int countOfChildren;
    private String education;

    private String workPlace;
    private String workAddress;
    private String position;
    private int experience;
    private double salary;
    private double otherIncome;
    private String voen;
    private EOwnerType formOfOwnership; // fiziki, hüquqi şəxs

    @NotBlank
    private String password;
    private Date lastLoginDate;
    private boolean loggedIn;

    @DBRef
    private Set<Partner> partners;

    @DBRef
    private Set<Role> roles;

    @DBRef
    private List<Token> tokens;

    private Date birthDate;

    private EUserStatus status;

    private Date signUpDate;

    private String photo;

    private String departmentId;

    public Map<String, Object> toMap() {
        Map<String, Object> userMap = new HashMap<>();

        // Basic details
        userMap.put("id", id);
        userMap.put("username", username);
        userMap.put("name", name);
        userMap.put("surname", surname);
        userMap.put("fullName", fullName);
        userMap.put("fatherName", fatherName);

        // Contact and identification
        userMap.put("gender", gender != null ? gender.name() : null);
        userMap.put("phoneNumber", phoneNumber);
        userMap.put("email", email);
        userMap.put("pin", pin);
        userMap.put("seriaNo", seriaNo);
        userMap.put("eventDate", eventDate);
        userMap.put("organisationName", organisationName);

        // Address details
        userMap.put("address", address);
        userMap.put("factAddress", factAddress);
        userMap.put("birthAddress", birthAddress);
        userMap.put("nationality", nationality);

        // Family and education
        userMap.put("maritalStatus", maritalStatus);
        userMap.put("countOfChildren", countOfChildren);
        userMap.put("education", education);

        // Employment
        userMap.put("workPlace", workPlace);
        userMap.put("workAddress", workAddress);
        userMap.put("position", position);
        userMap.put("experience", experience);
        userMap.put("salary", salary);
        userMap.put("otherIncome", otherIncome);
        userMap.put("voen", voen);
        userMap.put("formOfOwnership", formOfOwnership != null ? formOfOwnership.name() : null);

        // Account and status
        userMap.put("status", status != null ? status.name() : null);
        userMap.put("activationDate", activationDate);
        userMap.put("lastLoginDate", lastLoginDate);
        userMap.put("loggedIn", loggedIn);
        userMap.put("signUpDate", signUpDate);

        // Other
        userMap.put("birthDate", birthDate);
        userMap.put("photo", photo);
        userMap.put("departmentId", departmentId);
        return userMap;
    }

}
