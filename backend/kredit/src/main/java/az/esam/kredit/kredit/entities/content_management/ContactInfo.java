package az.esam.kredit.kredit.entities.content_management;

import az.esam.kredit.kredit.entities.BaseEntity;
import az.esam.kredit.kredit.entities.objects.BusinessHours;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "contactInfo")
public class ContactInfo extends BaseEntity {
    @Id
    private String id;
    private String phoneNumber;
    private String insurancePhoneNumber;
    private String email;
    private String locationUrl;
    private String location;
    private Map<String, String> socials;
    private List<BusinessHours> businessHours;
}
