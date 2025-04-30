package az.esam.kredit.kredit.dtos.responses.akbxml;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "akb_reports")
public class Report {

    @Id
    private String id;

    private String reportingDate;
    private Borrower borrower;
    private List<Liability> liabilities;
    private List<InquiryHistoryItem> inquiryHistory;
    private Score score;
    private Double balance;
}
