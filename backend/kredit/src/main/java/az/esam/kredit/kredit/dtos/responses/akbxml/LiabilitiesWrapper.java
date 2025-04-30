package az.esam.kredit.kredit.dtos.responses.akbxml;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class LiabilitiesWrapper {

    @XmlElement(name = "liability")
    private List<Liability> liabilityList;

    public List<Liability> getLiabilityList() {
        return liabilityList;
    }
}
