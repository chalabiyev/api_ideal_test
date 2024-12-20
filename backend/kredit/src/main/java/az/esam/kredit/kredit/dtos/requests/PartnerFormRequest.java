package az.esam.kredit.kredit.dtos.requests;

import az.esam.kredit.kredit.entities.enums.EActivityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PartnerFormRequest {
    private String companyName;
    private String directorName;
    private String voen;
    private String image;
    private String url;
    private double monthlySales;
    private EActivityType activityType;
    private List<String> companyImages;
    private String city;
    private String address;
}
