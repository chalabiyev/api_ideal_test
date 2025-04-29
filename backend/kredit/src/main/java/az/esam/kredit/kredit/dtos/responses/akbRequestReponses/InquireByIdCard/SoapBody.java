package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

import jakarta.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
public class SoapBody {

    public SoapBody() {
    }

    @XmlElement(name = "inquireByIdCardResponse", namespace = "http://inquiryws.mkr.risk.az/")
    private Return inquireByIdCardResponse;

    // Getter and Setter
    public Return getInquireByIdCardResponse() {
        return inquireByIdCardResponse;
    }

    public void setInquireByIdCardResponse(Return response) {
        this.inquireByIdCardResponse = response;
    }
}