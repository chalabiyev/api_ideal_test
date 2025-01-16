package az.esam.kredit.kredit.entities;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
@Document(collection = "blacklisted_individuals")
public class BlacklistedIndividual extends BaseEntity {
    String dataId;
    String firstName;
    String secondName;
    String thirdName;
    String nameAz;
    String surnameAz;
    String patronymicAz;
    String nameOriginalScript;
    String dateOfBirth;
}
