package az.esam.kredit.kredit.entities;

import java.util.Map;

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

    // return as a map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new java.util.HashMap<>();
        map.put("storeName", storeName);
        map.put("operationType", operationType);
        map.put("productName", productName);
        map.put("creditTerm", creditTerm);
        map.put("cashPrice", cashPrice);
        map.put("creditAmount", creditAmount);
        map.put("category", category);
        map.put("detail", detail);
        map.put("creditAmountInput", creditAmountInput);
        map.put("annualPercent", annualPercent);
        map.put("monthlyPayment", monthlyPayment);
        map.put("totalPayment", totalPayment);
        map.put("cardCost", cardCost);
        map.put("valuationCost", valuationCost);
        map.put("insuranceCost", insuranceCost);
        map.put("creditPurpose", creditPurpose);
        map.put("decisionQueryEnabled", decisionQueryEnabled);
        map.put("serviceRate", serviceRate);
        return map;
    }

}
