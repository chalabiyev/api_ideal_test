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
@Document(collection = "migrationDocument_info")
public class MigrationDocumentInfo extends BaseEntity {
    private String documentType;
    private String documentNumber;
    private String pin;

    private String personAz_name;
    private String personAz_surname;

    private String personEn_name;
    private String personEn_surname;

    private String gender;

    private Date birthDate;
    private String birthPlace;
    private String birthCountry;

    private String address_flat;
    private String address_house;
    private int address_regionId;
    private String address_regionName;
    private String address_street;

    private int passport_documentType;
    private String passport_documentNumber;
    private Date passport_expDate;
    private String passport_issuingCountry;
    private Date passport_issuingDate;
    private boolean passport_isActive;

    private Date eventDate;
    private Date expDate;
    private boolean isActive;

    private String imageFormat;
    private String image;
}
