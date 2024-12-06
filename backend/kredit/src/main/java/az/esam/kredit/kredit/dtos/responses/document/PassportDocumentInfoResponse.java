package az.esam.kredit.kredit.dtos.responses.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "passport_Info")
public class PassportDocumentInfoResponse {

    private String documentType;
    private String documentNumber;
    private String pin;

    private PersonAz personAz;
    private PersonEn personEn;
    private String gender;
    private Date birthDate;
    private String birthAddress;
    private String birthCountry;

    private String organisation;
    private Date eventDate;
    private Date expDate;
    @JsonProperty("isActive")
    private boolean isActive;

    private String nationality;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date activationDate;

    private String signature;
    private String photo;

}
