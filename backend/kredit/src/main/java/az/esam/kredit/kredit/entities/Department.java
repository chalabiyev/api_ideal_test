package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "users")
public class Department extends BaseEntity {
    @Id
    private String id;
    private String name;
    private String description;
    private String logo;

    @DBRef
    List<User> users;
}
