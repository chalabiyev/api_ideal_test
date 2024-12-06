package az.esam.kredit.kredit.dtos.responses.document;

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
@Document(collection = "migrationDocument_info")
public class MigrationDocumentInfoResponse {
    private String documentType;
    private String documentNumber;
    private String pin;

    private PersonAz personAz;
    private PersonEn personEn;
    private String gender;
    private Date birthDate;
    private String birthAddress;
    private String birthCountry;

    private RegisterAddress registerAddress;
    private PassportDetail passportDetail;

    private Date eventDate;
    private Date expDate;
    private Date issuingDate;

    @JsonProperty("isActive")
    private boolean isActive;

    private String imageFormat;
    private String image;
}
