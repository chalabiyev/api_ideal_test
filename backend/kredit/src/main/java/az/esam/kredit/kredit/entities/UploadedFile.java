package az.esam.kredit.kredit.entities;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "uploaded_files")
public class UploadedFile extends BaseEntity {

    @Id
    private String id;

    private String fileName;
    private Date upladedDate;
    private boolean isPublic;

    @DocumentReference
    private User owner;
}
