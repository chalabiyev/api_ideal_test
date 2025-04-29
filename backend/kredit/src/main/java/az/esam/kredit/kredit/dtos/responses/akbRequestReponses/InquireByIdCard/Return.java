package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

import jakarta.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
public class Return {

    public Return() {
    }

    @XmlElement(name = "return")
    private InquireByIdCardResponse returnData;

    // Getter and Setter
    public InquireByIdCardResponse getReturnData() {
        return returnData;
    }

    public void setReturnData(InquireByIdCardResponse returnData) {
        this.returnData = returnData;
    }
}