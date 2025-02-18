package az.esam.kredit.kredit.entities.objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Requirement {
    private String age;
    private String documents;
    private String guarantor;
    private String mortgage;
}
