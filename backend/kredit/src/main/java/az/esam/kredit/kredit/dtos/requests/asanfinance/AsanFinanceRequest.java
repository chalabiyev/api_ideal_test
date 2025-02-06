package az.esam.kredit.kredit.dtos.requests.asanfinance;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@ToString
@Document(collection = "asanfinance_expenses_requests")
public class AsanFinanceRequest {
    private String StartDate;
    private String EndDate;
    private String Offset;
    private String Limit;
}
