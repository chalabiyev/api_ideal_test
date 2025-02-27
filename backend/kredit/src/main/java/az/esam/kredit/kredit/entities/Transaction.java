package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.EPayment;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "transactions")
public class Transaction extends BaseEntity {

    @Id
    private String id;

    @Indexed
    private String userId;

    private double amount;

    @Indexed
    private String paymentKey;

    @Indexed
    private String paymentId;

    private EPayment paymentType;

    private String operationId;

    private String operationName;

    private Date operationDate;
}
