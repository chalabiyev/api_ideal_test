package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Builder
@Data
@Document(collection = "credit_requests")
public class PPTransEntity {
    private Date date;
    private double creditAmount;
    private double interestRate;
    private int creditTerm;
    private double monthlyPayment;

    private String userPin;
    private String userSerialNumber;
    private String userFullName;
    private Date birthDate;

    private double totalInterest;
    private double totalPayment;
    private List<PaymentTableContent> paymentTableContents;

    public Map<String, Object> toMap() {

        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");

        Map<String, Object> map = new HashMap<>();
        map.put("date", date != null ? formatter.format(date) : null);
        map.put("creditAmount", creditAmount);
        map.put("interestRate", interestRate);
        map.put("creditTerm", creditTerm);
        map.put("monthlyPayment", monthlyPayment);
        map.put("userPin", userPin);
        map.put("userSerialNumber", userSerialNumber);
        map.put("userFullName", userFullName);
        map.put("birthDate", birthDate != null ? formatter.format(birthDate) : null);
        map.put("totalInterest", totalInterest);
        map.put("totalPayment", totalPayment);

        map.put("paymentTable", paymentTableContents != null
                ? paymentTableContents.stream().map(table -> {
            Map<String, Object> tableMap = new HashMap<>();
            tableMap.put("date", table.getDate() != null ? formatter.format(table.getDate()) : null);
            tableMap.put("monthCount", table.getMonthCount());
            tableMap.put("payment", table.getPayment());
            tableMap.put("principal", table.getPrincipal());
            tableMap.put("interest", table.getInterest());
            tableMap.put("remainingDebt", table.getRemainingDebt());
            return tableMap;
        }).collect(Collectors.toList())
                : null);

        return map;
    }
}
