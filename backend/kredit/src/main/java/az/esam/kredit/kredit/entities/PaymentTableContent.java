package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "paymentTableContent")
public class PaymentTableContent extends BaseEntity {

    @Id
    private String id;
    private String creditRequestId;

    private Date date;
    private String monthCount;
    private double payment;
    private double principal;
    private double interest;
    private double remainingDebt;
}
