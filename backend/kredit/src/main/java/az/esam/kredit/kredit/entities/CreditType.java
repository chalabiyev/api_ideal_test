package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.objects.Condition;
import az.esam.kredit.kredit.entities.objects.Requirement;
import az.esam.kredit.kredit.entities.objects.VideoDescription;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "credit_types")
public class CreditType extends BaseEntity {
    @Id
    private String id;
    private String title;
    private String description;
    private String image;
    private String bannerImage;
    private Requirement requirements;
    private Condition conditions;
    private VideoDescription videoDescription;
}
