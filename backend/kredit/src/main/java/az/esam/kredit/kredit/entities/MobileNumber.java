package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "mobileNumbers")
public class MobileNumber {
    private String pin;
}
