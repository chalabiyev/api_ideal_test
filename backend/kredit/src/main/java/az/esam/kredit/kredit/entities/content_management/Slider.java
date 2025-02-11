package az.esam.kredit.kredit.entities.content_management;

import az.esam.kredit.kredit.entities.BaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "sliders")
public class Slider extends BaseEntity {

    @Id
    private String id;

    private String title;
    private String subTitle;
    private String link;
    private String image;
}
