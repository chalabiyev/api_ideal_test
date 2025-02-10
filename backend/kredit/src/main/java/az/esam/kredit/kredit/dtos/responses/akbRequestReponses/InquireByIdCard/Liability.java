package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Liability {
    private String id;
    private String bankId;
    private String bankName;
    private String accountNo;
    private String creditType;
    private String orgIDType;
    private String grantedOn;
    private Double initialAmount;
    private Double lineAmount;
    private Double daysInterestOverdue;
    private Double daysMainSumOverdue;
    private String contractDueOn;
    private String firstContractDueOn;
    private String interestRate;
    private String lastUpdatedDate;
    private String lastPaymentDate;
    private Double outstandingDebtMain;
    private Double outstandingDebtInterest;
    private Double monthlyPaymentAmount;
    private Double prolongations;
    private String creditStatus;
    private String creditPurpose;
    private String currency;
    private String mkrId;
    private String coBorrowerCount;
    private String frameworkContractId;
    private String collateralCode;
    private String collateralRegistryAgency;
    private String collateralRegistryNo;
    private String collateralAnyInfo;
    private String collateralMarketValue;
    private String creditStatusCloseDate;
    private History history;
    private String initialAmountHistory;
}

