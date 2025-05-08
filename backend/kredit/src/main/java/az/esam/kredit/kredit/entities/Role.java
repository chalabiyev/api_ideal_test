package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.ERole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "roles")
@NoArgsConstructor
public class Role extends BaseEntity {

    @Id
    private String id;

    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }
}
