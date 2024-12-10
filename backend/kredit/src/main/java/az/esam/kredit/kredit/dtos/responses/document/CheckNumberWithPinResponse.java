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
@Document(collection = "check_number_with_pin")
public class CheckNumberWithPinResponse {
    private Integer data;
    private String message;
}

