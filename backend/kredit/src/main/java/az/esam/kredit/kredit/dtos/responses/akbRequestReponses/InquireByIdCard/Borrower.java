package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

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
public class Borrower {
    private String documentNo;
    private String name;
    private String fin;
    private String dateOfBirth;
    private String placeOfBirth;
    private String personType;
    private String fileDate;
    private String locationCity;
    private String registeredAddress;
    private String status;
    private Boolean participantOfPatrioticWar;
}

