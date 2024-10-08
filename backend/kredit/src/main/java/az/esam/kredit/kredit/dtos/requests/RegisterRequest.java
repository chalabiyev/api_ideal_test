package az.esam.kredit.kredit.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@Builder
public class RegisterRequest {

    @NotBlank
    @Size(max = 50)
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    @Size(max = 20)
    private String phoneNumber;

    @NotBlank
    @Size(max = 120)
    private String fullName;

    private Set<String> roles;

    @NotBlank
    @Size(min = 6)
    private String password;

    @NotNull
    private Date birthDate;

    @Indexed(unique = true)
    @NotBlank
    @Size(max = 20)
    private String fin;

    @Indexed(unique = true)
    @NotBlank
    @Size(max = 20)
    private String serialNumber;

    @Indexed(unique = true)
    @NotBlank
    @Size(max = 20)
    private String passportStatus;

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Size(max = 120)
    private String surName;

    @NotBlank
    @Size(max = 120)
    private String fatherName;

    @NotBlank
    @Size(max = 120)
    private String familyRelationship;

    @NotBlank
    @Size(max = 50)
    private String gender;

    @NotBlank
    @Size(max = 100)
    private String state;

    @NotBlank
    @Size(max = 100)
    private String city;

    @NotBlank
    @Size(max = 100)
    private String country;

    @NotBlank
    @Size(max = 100)
    private String zipCode;

    @NotBlank
    @Size(max = 500)
    @Indexed(unique = true)
    private String address;

    private String photo;
}
