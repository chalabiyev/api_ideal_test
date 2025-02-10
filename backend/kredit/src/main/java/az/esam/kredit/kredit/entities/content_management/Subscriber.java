package az.esam.kredit.kredit.entities.content_management;

import az.esam.kredit.kredit.entities.BaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "subscribers")
public class Subscriber extends BaseEntity {
    @Id
    private String id;
    private String email;
    private Date subscribedAt;
    private boolean active;
}
