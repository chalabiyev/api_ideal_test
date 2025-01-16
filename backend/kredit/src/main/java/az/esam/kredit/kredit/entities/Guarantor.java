package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.dtos.responses.document.AddressDetail;
import az.esam.kredit.kredit.dtos.responses.document.BlackListStatus;
import az.esam.kredit.kredit.dtos.responses.document.Organisation;
import az.esam.kredit.kredit.dtos.responses.document.PersonAz;
import az.esam.kredit.kredit.dtos.responses.document.PersonEn;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "guarantors")
public class Guarantor extends BaseEntity {

    @Id
    private String id;

    private String documentType;
    private String pin;
    private String documentNumber;

    private PersonAz personAz;
    private PersonEn personEn;
    private String gender;
    private Date birthDate;
    private String birthAddress;

    private AddressDetail addressDetail;
    private Organisation organisation;

    private Date eventDate;
    private Date expDate;
    @JsonProperty("isActive")
    private boolean isActive;

    private String nationality;
    private String maritalStatus;
    private String bloodType;
    private String militaryStatus;
    private String eyeColor;
    private int height;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date activationDate;

    private String image;

    private BlackListStatus blackListStatus;

    private String relation;
    private String phoneNumber;
    private String workPlace;
    private String position;

}
