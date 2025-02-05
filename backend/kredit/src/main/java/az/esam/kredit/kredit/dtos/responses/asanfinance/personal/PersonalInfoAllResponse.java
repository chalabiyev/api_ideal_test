package az.esam.kredit.kredit.dtos.responses.asanfinance.personal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PersonalInfoAllResponse {
    private String pin;
    private String documentSeria;
    private String documentNumber;
    private String name;
    private String surname;
    private String nameEn;
    private String surnameEn;
    private String patronymic;
    private String birthDate;
    private String birthAddress;
    private String gender;
    private String registrationAddress;
    private String givenDate;
    private String activationDate;
    private String expireDate;
    private String maritalStatus;
    private String givenOrganization;
    private String citizenship;
    private String image;
    private String militaryStatus;
    private String bloodType;
    private String eyeColor;
    private String sign;
    private Integer height;
    private Boolean status;
}