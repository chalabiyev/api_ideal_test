package az.esam.kredit.kredit.dtos.responses.asanfinance.passport;

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
public class PassportInfoResponse {
    private String PIN;
    private String DocumentNumber;
    private String Name;
    private String Surname;
    private String Patronymic;
    private String BirthDate;
    private String ExpireDate;
    private String GivenDate;
    private String Nationality;
    private String Gender;
    private String ActivationDate;
    private String BirthCountry;
    private String GivenOrganization;
    private String PassportType;
}