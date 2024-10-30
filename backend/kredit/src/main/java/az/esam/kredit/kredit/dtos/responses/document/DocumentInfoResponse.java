package az.esam.kredit.kredit.dtos.responses.document;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "document_info")
public class DocumentInfoResponse {
    private String type;
    private String passportNumber;
    private String pin;
    private String firstName;
    private String lastName;
    private String patronymic;
    private String address;
    private String sex;
    private String birthDate;
}
