package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

import jakarta.xml.bind.annotation.*;

@XmlRootElement(name = "Envelope", namespace = "http://schemas.xmlsoap.org/soap/envelope/")
@XmlAccessorType(XmlAccessType.FIELD)
public class SoapEnvelope {

    public SoapEnvelope() {
    }

    @XmlElement(name = "Body", namespace = "http://schemas.xmlsoap.org/soap/envelope/")
    private SoapBody body;

    // Getter and Setter
    public SoapBody getBody() {
        return body;
    }

    public void setBody(SoapBody body) {
        this.body = body;
    }
}