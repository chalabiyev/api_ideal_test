package az.esam.kredit.kredit.dtos.responses.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "cardRegistration_responses")
public class CardRegistrationResponse {

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
    private String code;
    private String message;

    private String card_id;
    private String bank_transaction;
    private String bank_response;
    private String operation_code;
    private String rrn;
    private String card_name;
    private String card_mask;
}
