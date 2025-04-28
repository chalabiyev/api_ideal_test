package az.esam.kredit.kredit.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreditDetail {

    private String storeName;
    private String operationType;
    private String productName;
    private Integer creditTerm;
    private Double cashPrice;
    private Double creditAmount;
    private String category;
    private String detail;
    private Double creditAmountInput;
    private Double annualPercent;
    private Double monthlyPayment;
    private Double totalPayment;
    private Double cardCost;
    private Double valuationCost;
    private Double insuranceCost;
    private String creditPurpose;
    private Boolean decisionQueryEnabled;
    private Double serviceRate;

}
