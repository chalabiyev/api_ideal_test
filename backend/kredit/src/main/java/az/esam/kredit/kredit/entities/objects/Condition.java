package az.esam.kredit.kredit.entities.objects;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Condition {
    private double minAmount;
    private double maxAmount;
    private int minPeriod;
    private int maxPeriod;
    private double minRate;
    private double maxRate;
    private double minFIFD;
    private double maxFIFD;
    private String currency;
    private double commissionRate;
    private String requiredDocuments;
}
