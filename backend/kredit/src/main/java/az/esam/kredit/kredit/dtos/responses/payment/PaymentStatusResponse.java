package az.esam.kredit.kredit.dtos.responses.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

/**
 * @author cihan
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "payment_responses")
public class PaymentStatusResponse {

    @Id
    private String id;

    private String order_id;
    /*
    new- ödəniş Epoint sistemində qeydə alınıb ;
    success- ödəniş uğurla icra edildi;
    returned- ödənişin geri qaytarılması icra edildi;
    error- ödəniş zamanı bir səhv yarandı;
    server_error- status doğrulama xətası
     */
    private String status;
    private String code;
    private String message;
    private String transaction;
    private String bank_transaction;
    private String bank_response;
    private String operation_code;
    private String rrn;
    private String card_name;
    private String card_mask;
    private String amount;
    private String other_attr;

}
