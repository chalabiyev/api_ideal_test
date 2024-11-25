package az.esam.kredit.kredit.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "otprecords")
@Data
public class OTPRecord {

    @Id
    private String id;

    @NotBlank
    @Size(max = 40)
    private String clientUUID;

    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotNull
    private String otpCode;

    @NotNull
    private String ipAddress;

    private Date sendDate;

    private Date expirationDate;

    private Date validationDate;
}
