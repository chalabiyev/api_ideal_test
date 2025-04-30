package az.esam.kredit.kredit.dtos.responses.akbxml;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class ResponseReturn {

    private String reportId;
    private String reportingDate;

    @XmlElement(name = "borrower")
    private Borrower borrower;

    @XmlElement(name = "liabilities")
    private LiabilitiesWrapper liabilities;

    @XmlElement(name = "inquiryHistory")
    private InquiryHistoryWrapper inquiryHistory;

    @XmlElement(name = "score")
    private Score score;

    private Double balance;

    public String getReportId() {
        return reportId;
    }

    public LiabilitiesWrapper getLiabilities() {
        return liabilities;
    }

    public InquiryHistoryWrapper getInquiryHistory() {
        return inquiryHistory;
    }

    public Score getScore() {
        return score;
    }

    public Double getBalance() {
        return balance;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public String getReportingDate() {
        return reportingDate;
    }

    public void setReportingDate(String reportingDate) {
        this.reportingDate = reportingDate;
    }

    public Borrower getBorrower() {
        return borrower;
    }

    public void setBorrower(Borrower borrower) {
        this.borrower = borrower;
    }

    public void setLiabilities(LiabilitiesWrapper liabilities) {
        this.liabilities = liabilities;
    }

    public void setInquiryHistory(InquiryHistoryWrapper inquiryHistory) {
        this.inquiryHistory = inquiryHistory;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

}
