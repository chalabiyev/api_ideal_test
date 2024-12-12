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
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "id_card_info")
public class FullIDCardInfoResponse {

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
}

