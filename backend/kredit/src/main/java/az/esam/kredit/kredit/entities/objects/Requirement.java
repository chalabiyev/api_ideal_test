package az.esam.kredit.kredit.entities.objects;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Requirement {
    private String age;
    private String documents;
    private String guarantor;
    private String mortgage;
}
