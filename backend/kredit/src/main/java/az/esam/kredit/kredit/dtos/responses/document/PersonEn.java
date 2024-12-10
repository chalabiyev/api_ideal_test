package az.esam.kredit.kredit.dtos.responses.document;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonEn {
    private String name;
    private String surname;
    private String patronymic;
}
