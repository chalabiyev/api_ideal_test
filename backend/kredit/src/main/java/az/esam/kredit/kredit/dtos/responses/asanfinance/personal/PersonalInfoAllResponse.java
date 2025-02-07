package az.esam.kredit.kredit.dtos.responses.asanfinance.personal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "asan_PersonalInfoAllResponse")
public class PersonalInfoAllResponse {

    @Id
    private String PIN;
    private String DocumentSeria;
    private String DocumentNumber;
    private String Name;
    private String Surname;
    private String NameEn;
    private String SurnameEn;
    private String Patronymic;
    private String BirthDate;
    private String BirthAddress;
    private String Gender;
    private String RegistrationAddress;
    private String GivenDate;
    private String ActivationDate;
    private String ExpireDate;
    private String MaritalStatus;
    private String GivenOrganization;
    private String Citizenship;
    private String Image;
    private String MilitaryStatus;
    private String BloodType;
    private String EyeColor;
    private String Sign;
    private String Height;
    private String Status;


}