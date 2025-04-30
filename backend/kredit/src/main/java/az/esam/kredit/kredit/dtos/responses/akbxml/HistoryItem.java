package az.esam.kredit.kredit.dtos.responses.akbxml;


import lombok.Data;

@Data
public class HistoryItem {
    private Integer overdueDays;
    private String reportingPeriod;
    private String creditStatus;
}