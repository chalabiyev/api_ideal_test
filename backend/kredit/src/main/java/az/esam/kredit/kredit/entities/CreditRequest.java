package az.esam.kredit.kredit.entities;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import az.esam.kredit.kredit.entities.enums.CreditRequestStatusEnum;
import az.esam.kredit.kredit.entities.enums.EActivateStatus;
import az.esam.kredit.kredit.entities.enums.ECreditType;
import az.esam.kredit.kredit.entities.enums.EFinalStatus;
import az.esam.kredit.kredit.entities.enums.EGuarantyType;
import az.esam.kredit.kredit.utility.RoundUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "credit_requests")
@NoArgsConstructor
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

    // creditAmount - (creditAmount * serviceRate) - (creditAmount * insuranceCost)
    // - cartCost - valuationCost
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

    @DocumentReference
    private Partner partner;

    @DocumentReference
    private List<Guarantor> guarantors;

    private Recruiter recruiter;

    private Double cashPrice;
    private String operationType;
    private String productName;

    private CreditDetail creditDetails;
    private String workExperience;
    private String familyMembers;
    private String familyIncome;
    private boolean isRenting;
    private String rentAmount;
    private String rentDuration;
    private String actualAddress;
    private List<AdditionalIncome> additionalIncomes;
    private int idQuality;
    private String generalNote;
    private List<Person> relatedPersons;
    private Pensioner pensioner;
    private int creditOrderNo;
    private int creditYear;
    private List<CreditProduct> items;
    private Double commissionRate;
    private Double calculatedFIFD;

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
        map.put("monthlyPayment", monthlyPayment != null ? RoundUtil.round(monthlyPayment, 2) : null);
        map.put("amountToBePaid", amountToBePaid);
        map.put("creditPurpose", creditPurpose);
        map.put("annualPercent", annualPercent);
        map.put("otherPayment", otherPayment);
        map.put("notarialCost", notarialCost);
        map.put("insuranceType", insuranceType);
        map.put("guarantee", guarantee != null ? guarantee.name() : null);
        map.put("cashPrice", cashPrice);
        map.put("operationType", operationType);
        map.put("productName", productName);
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
        map.put("creditOrderNo", creditOrderNo);
        map.put("creditYear", creditYear);
        map.put("requestDateStr", new SimpleDateFormat("dd.MM.yyyy").format(requestDate));
        map.put("creditOrderNoStr", String.format("%05d", creditOrderNo));
        map.put("documentNumber", "İK-BSİ/" + String.format("%05d", creditOrderNo) + "/" + creditYear);
        map.put("documentDate", new SimpleDateFormat("dd.MM.yyyy").format(requestDate));
        if (partner != null) {
            map.put("partner", partner.toMap());
        }
        if (items != null) {
            map.put("items", items.stream().map(item -> item.toMap()).collect(Collectors.toList()));
            map.put("totalPrice", items.stream().mapToDouble(item -> item.getTotalPrice()).sum());
        }
        if (creditDetails != null) {
            map.put("creditDetails", creditDetails.toMap());
        }
        map.put("isPhysicalPerson", true);
        map.put("isLegalPerson", false);
        map.put("commissionRate", commissionRate);
        map.put("calculatedFIFD", calculatedFIFD);
        return map;
    }

}
