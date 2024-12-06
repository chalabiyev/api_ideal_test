package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.EInsuranceType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "insurances")
public class Insurance extends BaseEntity {
    @Id
    private String id;
    private EInsuranceType insuranceType;
    private String image;
    private String bannerImage;
    private String title;
    private String description;
}
