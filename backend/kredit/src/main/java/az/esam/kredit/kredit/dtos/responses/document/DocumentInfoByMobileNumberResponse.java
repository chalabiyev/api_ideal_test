package az.esam.kredit.kredit.dtos.responses.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "document_info_by_mobile_number")
public class DocumentInfoByMobileNumberResponse {

    private String type;
    private String pasportNumber;
    private String pin;
    private String firstName;
    private String lastName;
    private String patronymic;
    private String address;
    private String sex;
    private String birthDate;
}
