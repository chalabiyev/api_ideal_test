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
@Document(collection = "credit_requests")
public class CreditRequest extends BaseEntity {

    @Id
    private String id;
    private String phoneNumber;
    private Double creditAmount;
    private Date requestDate;
    private CreditRequestStatusEnum confirmStatus;

    @DocumentReference
    private User requestedUser;

    @DocumentReference
    private User confirmerUser;
    private Date confirmDate;
    private String confirmerComment;
    
    private String simaContractOperationId;

}
