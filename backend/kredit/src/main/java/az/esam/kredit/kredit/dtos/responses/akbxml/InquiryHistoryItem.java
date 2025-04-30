package az.esam.kredit.kredit.dtos.responses.akbxml;


import lombok.Data;

@Data
public class InquiryHistoryItem {
    private String inqOrgIDType;
    private String inqBankId;
    private String inqBankName;
    private String inqDate;
    private String inqPurposeId;
}