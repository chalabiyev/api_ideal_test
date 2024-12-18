package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "creditCards")
public class CreditCard extends BaseEntity {
    @Id
    private String id;

    @Indexed(unique = true)
    private String cardNumber;

    private String cvv;
    private String expiryDate;

    @Indexed(unique = true)
    private String serialNumber;
}
