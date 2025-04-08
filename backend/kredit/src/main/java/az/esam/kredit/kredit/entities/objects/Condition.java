package az.esam.kredit.kredit.entities.objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Condition {
    private String minAmount;
    private String maxAmount;
    private String minPeriod;
    private String maxPeriod;
    private String minRate;
    private String maxRate;
    private String minFIFD;
    private String maxFIFD;
    private String currency;
    private String commissionRate;
    private String requiredDocuments;
}
