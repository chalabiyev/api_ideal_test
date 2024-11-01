package az.esam.kredit.kredit.dtos.responses.document;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "voen_Info")
public class VoenInfoResponse {
    private String voenType;
    private String name;
    private String surname;
    private String middleName;
    private String pin;
    private String fullAddress;
    private String voenDate;
    private String voen;
}
