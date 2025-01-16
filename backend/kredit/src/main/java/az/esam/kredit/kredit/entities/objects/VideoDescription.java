package az.esam.kredit.kredit.entities.objects;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VideoDescription {
    private String title;
    private String shortDescription;
    private String description;
    private String videoUrl;
}
