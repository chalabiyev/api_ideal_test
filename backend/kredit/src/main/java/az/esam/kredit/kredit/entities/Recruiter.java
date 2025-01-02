package az.esam.kredit.kredit.entities;

import java.util.Date;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Builder
@Data
public class Recruiter {

    @Id
    private String id;
    
    private String education;
    private String companyName;
    private Double salary;
    private String address;
    private String position;
    private Double workExperience;
    private Date contractStartDate;
    private Date contractEndDate;
    private Double toplamodenis;
    private String akbmelumatlari;
    private String daxilirisk;
    private Double ayliqemekhaqqi;
    private Double ayliqcemigelir;
    private Double xerclerincemi;
    private Double xalisgelir;
    
}
