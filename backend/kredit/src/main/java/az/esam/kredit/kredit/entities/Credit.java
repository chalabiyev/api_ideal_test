package az.esam.kredit.kredit.entities;

import az.esam.kredit.kredit.entities.enums.ECreditType;
import az.esam.kredit.kredit.entities.enums.EGuarantyType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "credits")
public class Credit extends BaseEntity {
    @Id
    private String id;
    private String phoneNumber;
    private Map<String, String> otherPhoneNumbers;
    private Double creditAmount;
    private int creditTerm;
    private String creditAmountWithText;
    private Date requestDate;

    @DocumentReference
    private User confirmerUser;
    private boolean isConnectedWithBOKT;

    private Date confirmDate;
    private String confirmerComment;
    private ECreditType creditType;
    private Double serviceRate;
    private Double cartCost;
    private Double insuranceCost;
    private Double valuationCost;
    private Double monthlyPayment;
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
}
