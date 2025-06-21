package az.esam.kredit.kredit.dtos.responses.document;

import az.esam.kredit.kredit.dtos.enums.ESource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "mobileNumbers_Info")
public class MobileNumberResponse {
    private String phone;
    private String typeName;
    private ESource source;

}