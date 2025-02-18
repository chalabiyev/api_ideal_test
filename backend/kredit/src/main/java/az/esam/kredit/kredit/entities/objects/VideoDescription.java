package az.esam.kredit.kredit.entities.objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDescription {
    private String title;
    private String shortDescription;
    private String description;
    private String videoUrl;
}
