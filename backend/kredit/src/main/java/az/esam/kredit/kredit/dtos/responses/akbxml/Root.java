package az.esam.kredit.kredit.dtos.responses.akbxml;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Envelope", namespace = "http://schemas.xmlsoap.org/soap/envelope/")
@XmlAccessorType(XmlAccessType.FIELD)
public class Root {

    @XmlElement(name = "Body", namespace = "http://schemas.xmlsoap.org/soap/envelope/")
    private SoapBody soapBody;

    public SoapBody getSoapBody() {
        return soapBody;
    }
}
