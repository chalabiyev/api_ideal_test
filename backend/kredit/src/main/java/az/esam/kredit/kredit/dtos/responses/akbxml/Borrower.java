package az.esam.kredit.kredit.dtos.responses.akbxml;

import lombok.Data;

@Data
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
