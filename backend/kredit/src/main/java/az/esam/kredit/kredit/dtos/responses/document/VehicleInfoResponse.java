package az.esam.kredit.kredit.dtos.responses.document;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "vehicle_info")
public class VehicleInfoResponse {
    private String color;
    private String bodyNumber;
    private String vehicleRegistryDate;
    private String vehicleNumber;
    private String vehicleModel;
    private String vehicleManufactYear;
    private String note;
    private String pin;
    private String patronymic;
    private String surname;
    private String name;
    private String engineCapacity;
}
