package az.esam.kredit.kredit.entities;

import java.util.Date;
import java.util.List;
import java.util.Map;

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

    @DocumentReference
    private User requestedUser;
    private boolean isConnectedWithBOKT;
    private String formOfOwnership;

    @DocumentReference
    private User confirmerUser;
    private Date confirmDate;
    private String confirmerComment;
    private String creditType;
    private double serviceRate;
    private double cartCost;
    private double insuranceCost;
    private double valuationCost;
    private double monthlyPayment;

    //creditAmount - (creditAmount * serviceRate) - (creditAmount * insuranceCost) - cartCost - valuationCost
    private double amountToBePaid;

    private String creditPurpose;
    private double annualPercent;
    private double otherPayment;
    private String notarialCost;
    private String insuranceType;
    private String guarantee;

    private List<Spouse> spouses;

    private String fine;

    private String simaContractOperationId;

}


class Spouse {
    private String fullName;
    private String serialNumber;
    private String eventDate;
    private String organisationName;
    private String birthAddress;
    private String nationality;
    private String address;
    private String factAddress;
    private String phoneNumbers;
    private String workPlace;
    private String workAddress;
    private String position;

    // All-args constructor
    public Spouse(String fullName, String serialNumber, String eventDate, String organisationName,
                  String birthAddress, String nationality, String address, String factAddress,
                  String phoneNumbers, String workPlace, String workAddress, String position) {
        this.fullName = fullName;
        this.serialNumber = serialNumber;
        this.eventDate = eventDate;
        this.organisationName = organisationName;
        this.birthAddress = birthAddress;
        this.nationality = nationality;
        this.address = address;
        this.factAddress = factAddress;
        this.phoneNumbers = phoneNumbers;
        this.workPlace = workPlace;
        this.workAddress = workAddress;
        this.position = position;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getBirthAddress() {
        return birthAddress;
    }

    public void setBirthAddress(String birthAddress) {
        this.birthAddress = birthAddress;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFactAddress() {
        return factAddress;
    }

    public void setFactAddress(String factAddress) {
        this.factAddress = factAddress;
    }

    public String getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(String phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    public String getWorkPlace() {
        return workPlace;
    }

    public void setWorkPlace(String workPlace) {
        this.workPlace = workPlace;
    }

    public String getWorkAddress() {
        return workAddress;
    }

    public void setWorkAddress(String workAddress) {
        this.workAddress = workAddress;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}