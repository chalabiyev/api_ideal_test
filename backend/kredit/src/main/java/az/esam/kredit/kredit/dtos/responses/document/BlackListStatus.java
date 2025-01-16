package az.esam.kredit.kredit.dtos.responses.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlackListStatus {
    private int matchCount;
    private String message;
}
