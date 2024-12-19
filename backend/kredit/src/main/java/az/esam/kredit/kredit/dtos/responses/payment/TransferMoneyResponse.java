package az.esam.kredit.kredit.dtos.responses.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Document(collection = "transferMoney_responses")
public class TransferMoneyResponse {

    @Id
    private String id;

    /*
    new- ödəniş Epoint sistemində qeydə alınıb ;
    success- ödəniş uğurla icra edildi;
    returned- ödənişin geri qaytarılması icra edildi;
    error- ödəniş zamanı bir səhv yarandı;
    server_error- status doğrulama xətası
     */
    private String status;
    private String message;

    private String transaction;

    private String bank_transaction;
    private String bank_response;

    private String rrn;
    private String card_name;
    private String card_mask;
    private double amount;

}
