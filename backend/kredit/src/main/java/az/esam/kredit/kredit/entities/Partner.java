package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.EActivityType;
import az.esam.kredit.kredit.entities.enums.EFinalStatus;
import az.esam.kredit.kredit.entities.enums.EOwnerType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "partners")
public class Partner extends BaseEntity {
    @Id
    private String id;
    private String phoneNumber;
    private String companyName;
    private String directorName;
    private String voen;
    private String pin;
    private String image;
    private String url;
    private double monthlySales;
    private EActivityType activityType;
    private EOwnerType formOfOwnership;
    private List<String> companyImages;
    private String city;
    private String address;
    private EFinalStatus status;
}
