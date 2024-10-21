package az.esam.kredit.kredit.entities.documents;

import az.esam.kredit.kredit.entities.BaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "passport_Info")
public class PassportDocumentInfo extends BaseEntity {

    private String documentType;
    private String documentNumber;
    private String pin;

    private String personAz_name;
    private String personAz_surname;
    private String personAz_patronymic;

    private String personEn_name;
    private String personEn_surname;
    private String personEn_patronymic;

    private String gender;

    private Date birthDate;
    private String birthPlace;
    private String birthCountry;

    private String organisation;
    private Date eventDate;
    private Date expDate;
    private boolean isActive;

    private String nationality;
    private Date activationDate;

    private String signature;
    private String image;

}
