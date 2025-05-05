package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.EActivityType;
import az.esam.kredit.kredit.entities.enums.EFinalStatus;
import az.esam.kredit.kredit.entities.enums.EOwnerType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "partners")
public class Partner extends BaseEntity {
    @Id
    private String id;
    private String phoneNumber;
    private String businessName;
    private String identityCard;
    private String rentContract;
    private Date startDate;
    private String establishmentDocument;

    private String voen;
    private String bank;
    private String clientBankAccount;
    private String reportBankAccount;
    private String bankCode;
    private String bankVoen;
    private String swiftCode;

    private String singableContract;
    private String companyName;
    private String directorName;
    private String pin;
    private String image;
    private String url;
    private Double monthlySales;
    private EActivityType activityType;
    private EOwnerType formOfOwnership;
    private List<String> companyImages;
    private String country;
    private String city;
    private String address;
    private EFinalStatus status;
    private Date statusUpdatedDate;

    // return as a map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("phoneNumber", phoneNumber);
        map.put("businessName", businessName);
        map.put("identityCard", identityCard);
        map.put("rentContract", rentContract);
        map.put("startDate", startDate);
        map.put("establishmentDocument", establishmentDocument);
        map.put("voen", voen);
        map.put("bank", bank);
        map.put("clientBankAccount", clientBankAccount);
        map.put("reportBankAccount", reportBankAccount);
        map.put("bankCode", bankCode);
        map.put("bankVoen", bankVoen);
        map.put("swiftCode", swiftCode);
        map.put("singableContract", singableContract);
        map.put("companyName", companyName);
        map.put("directorName", directorName);
        map.put("pin", pin);
        map.put("image", image);
        map.put("url", url);
        map.put("monthlySales", monthlySales);
        map.put("activityType", activityType != null ? activityType.name() : null);
        map.put("formOfOwnership", formOfOwnership != null ? formOfOwnership.name() : null);
        map.put("companyImages", companyImages);
        map.put("country", country);
        map.put("city", city);
        map.put("address", address);
        map.put("status", status != null ? status.name() : null);
        map.put("statusUpdatedDate", statusUpdatedDate);
        return map;
    }
}
