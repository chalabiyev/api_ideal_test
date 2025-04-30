package az.esam.kredit.kredit.dtos.responses.akbxml;


import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class SoapBody {
    @XmlElement(name = "inquireByIdCardResponse", namespace = "http://inquiryws.mkr.risk.az/")
    private InquireByIdCardResponse inquireByIdCardResponse;

    public InquireByIdCardResponse getInquireByIdCardResponse() {
        return inquireByIdCardResponse;
    }
}