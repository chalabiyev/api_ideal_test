package az.esam.kredit.kredit.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RejectRequest {
    @Id
    private String id = UUID.randomUUID().toString();
    private String rejectReason;
}
