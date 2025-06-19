package az.esam.kredit.kredit.entities;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RejectRequest {
    @Id
    private String id = UUID.randomUUID().toString();
    private String rejectReason;
}
