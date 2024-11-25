package az.esam.kredit.kredit.dtos.responses.document;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "vehicle_info")
public class VehicleInfoResponse {
    private int color;
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
