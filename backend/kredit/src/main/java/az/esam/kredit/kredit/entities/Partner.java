package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "partners")
public class Partner extends BaseEntity {
    @Id
    private String id;
    private String name;
    private String image;
    private String url;
}
