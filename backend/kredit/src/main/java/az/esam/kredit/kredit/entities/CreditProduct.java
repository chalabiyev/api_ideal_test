package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "credit_products")
public class CreditProduct extends BaseEntity {
    @Id
    private String id;
    private String productName;
    private String description;
    private String logo;
    private Double unitPrice;
    private Double quantity;
    private Double totalPrice;

    // return as a map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("productName", productName);
        map.put("description", description);
        map.put("logo", logo);
        map.put("unitPrice", unitPrice);
        map.put("quantity", quantity);
        map.put("totalPrice", totalPrice);
        return map;
    }
}
