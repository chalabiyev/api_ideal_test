package az.esam.kredit.kredit.dtos.responses.document;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Data
@Document(collection = "idCard_Info")
public class IDCardInfoResponse {

    private String documentType;
    private String documentNumber;
    private String pin;

    private String personAz_name;
    private String personAz_surname;
    private String personAz_patronymic;

    private String gender;
    private Date birthDate;
    private String birthAddress;

    private String address_address;
    private String address_flat;
    private String address_house;
    private String address_village;
    private String address_region;
    private String address_settlement;
    private String address_street;

    private int organisation_legacyId;
    private String organisation_name;

    private Date eventDate;
    private Date expDate;
    private boolean isActive;

    private String nationality;
    private String maritalStatus;
    private String bloodType;
    private String militaryStatus;
    private String eyeColor;
    private int height;

    private Date activationDate;

    private String image;

}
