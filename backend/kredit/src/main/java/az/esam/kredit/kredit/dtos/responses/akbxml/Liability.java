package az.esam.kredit.kredit.dtos.responses.akbxml;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
public class Liability {
    private String id;
    private String bankId;
    private String bankName;
    private String accountNo;
    private String creditType;
    private String orgIDType;
    private String grantedOn;
    private Double initialAmount;
    private Integer lineAmount;
    private Integer daysInterestOverdue;
    private Integer daysMainSumOverdue;
    private String contractDueOn;
    private Double interestRate;
    private String lastUpdatedDate;
    private String lastPaymentDate;
    private Double outstandingDebtMain;
    private Double outstandingDebtInterest;
    private Double monthlyPaymentAmount;
    private Integer prolongations;
    private String creditStatus;
    private String creditStatusCloseDate;
    private String creditPurpose;
    private String currency;
    private String mkrId;
    private String collateralCode;
    private String collateralRegistryAgency;
    private String collateralRegistryNo;
    private String collateralAnyInfo;
    private List<HistoryItem> history;
}