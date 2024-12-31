package az.esam.kredit.kredit.entities;

import java.util.Date;
import java.util.List;
import java.util.Map;

import az.esam.kredit.kredit.entities.enums.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Builder
@Data
public class CreditRequestDto {

    @Id
    private String id;
    private String phoneNumber;
    private Map<String, String> otherPhoneNumbers;
    private Double creditAmount;
    private int creditTerm;
    private String creditAmountWithText;
    private Date requestDate;
    private CreditRequestStatusEnum confirmStatus;
    private EActivateStatus activateStatus;
    private EFinalStatus finalStatus;

    private String requestedUserPin;
    private boolean isConnectedWithBOKT;

    private String confirmerComment;
    private ECreditType creditType;
    private Double serviceRate;
    private Double cartCost;
    private Double insuranceCost;
    private Double valuationCost;
    private Double monthlyPayment;

    //creditAmount - (creditAmount * serviceRate) - (creditAmount * insuranceCost) - cartCost - valuationCost
    private Double amountToBePaid;

    private String creditPurpose;
    private Double annualPercent;
    private Double otherPayment;
    private String notarialCost;
    private String insuranceType;
    private EGuarantyType guarantee;

    private List<Spouse> spouses;

    private String fine;

    private String simaContractOperationId;
    private String contractFileName;
    private String videoSignFileName;
    private Boolean decisionQueryEnabled;
    private String videoSignText;
    private String partnerId;

}
