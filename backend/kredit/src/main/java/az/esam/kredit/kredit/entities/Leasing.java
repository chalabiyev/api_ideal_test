package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "leasingRequest")
public class Leasing {
    private String mobileNumber;
    private String carValue;
    private String initialPayment;
    private String leasingAmount;
    private String leasingPeriod;
}
