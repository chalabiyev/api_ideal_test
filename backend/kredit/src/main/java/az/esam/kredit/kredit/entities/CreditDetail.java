package az.esam.kredit.kredit.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreditDetail {

    private String storeName;
    private String operationType;
    //private String urlNumber;
    private List<Product> products;

    // return as a map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new java.util.HashMap<>();
        map.put("storeName", storeName);
        map.put("operationType", operationType);
        //map.put("urlNumber", urlNumber);
        map.put("products", products);
        return map;
    }

    @Data
    @NoArgsConstructor
    public static class Product {
        private int productCount;
        private String productName;
        private Integer creditTerm;
        private Double cashPrice;
        private Double creditAmount;
        private String category;
        private String detail;
        private String logoUrl;
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
}
