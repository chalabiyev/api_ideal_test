package az.esam.kredit.kredit.dtos.responses.akbxml;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InquireByIdCardResponse {

    @XmlElement(name = "return")
    private ResponseReturn responseReturn;

    public ResponseReturn getReturn() {
        return responseReturn;
    }
}
