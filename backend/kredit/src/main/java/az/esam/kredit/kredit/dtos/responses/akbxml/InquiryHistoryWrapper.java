package az.esam.kredit.kredit.dtos.responses.akbxml;


import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class InquiryHistoryWrapper {
    @XmlElement(name = "inquiryHistoryItem")
    private List<InquiryHistoryItem> items;

    public List<InquiryHistoryItem> getItems() {
        return items;
    }
}