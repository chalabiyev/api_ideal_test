package az.esam.kredit.kredit.entities;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import az.esam.kredit.kredit.entities.enums.*;
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
    private Map<String, String> otherPhoneNumbers;
    private Double creditAmount;
    private int creditTerm;
    private String creditAmountWithText;
    private Date requestDate;
    private CreditRequestStatusEnum confirmStatus;
    private EActivateStatus activateStatus;
    private EFinalStatus finalStatus;

    @DocumentReference
    private User requestedUser;
    private boolean isConnectedWithBOKT;

    @DocumentReference
    private User confirmerUser;
    private Date confirmDate;
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

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("phoneNumber", phoneNumber);
        map.put("otherPhoneNumbers", otherPhoneNumbers);
        map.put("creditAmount", creditAmount);
        map.put("creditTerm", creditTerm);
        map.put("creditAmountWithText", creditAmountWithText);
        map.put("requestDate", requestDate);
        map.put("confirmStatus", confirmStatus != null ? confirmStatus.name() : null);
        map.put("activateStatus", activateStatus != null ? activateStatus.name() : null);
        map.put("finalStatus", finalStatus != null ? finalStatus.name() : null);
        map.put("requestedUser", requestedUser != null ? requestedUser.toMap() : null);
        map.put("isConnectedWithBOKT", isConnectedWithBOKT);
        map.put("confirmerUser", confirmerUser != null ? confirmerUser.toMap() : null);
        map.put("confirmDate", confirmDate);
        map.put("confirmerComment", confirmerComment);
        map.put("creditType", creditType != null ? creditType.name() : null);
        map.put("serviceRate", serviceRate);
        map.put("cartCost", cartCost);
        map.put("insuranceCost", insuranceCost);
        map.put("valuationCost", valuationCost);
        map.put("monthlyPayment", monthlyPayment);
        map.put("amountToBePaid", amountToBePaid);
        map.put("creditPurpose", creditPurpose);
        map.put("annualPercent", annualPercent);
        map.put("otherPayment", otherPayment);
        map.put("notarialCost", notarialCost);
        map.put("insuranceType", insuranceType);
        map.put("guarantee", guarantee != null ? guarantee.name() : null);
        map.put("spouses", spouses != null
                ? spouses.stream().map(spouse -> {
                    Map<String, Object> spouseMap = new HashMap<>();
                    spouseMap.put("fullName", spouse.getFullName());
                    spouseMap.put("serialNumber", spouse.getSerialNumber());
                    spouseMap.put("eventDate", spouse.getEventDate());
                    spouseMap.put("organisationName", spouse.getOrganisationName());
                    spouseMap.put("birthAddress", spouse.getBirthAddress());
                    spouseMap.put("nationality", spouse.getNationality());
                    spouseMap.put("address", spouse.getAddress());
                    spouseMap.put("factAddress", spouse.getFactAddress());
                    spouseMap.put("phoneNumbers", spouse.getPhoneNumbers());
                    spouseMap.put("workPlace", spouse.getWorkPlace());
                    spouseMap.put("workAddress", spouse.getWorkAddress());
                    spouseMap.put("position", spouse.getPosition());
                    return spouseMap;
                }).collect(Collectors.toList())
                : null);
        map.put("fine", fine);
        map.put("simaContractOperationId", simaContractOperationId);

        return map;
    }

}
