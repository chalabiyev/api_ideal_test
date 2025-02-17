package az.esam.kredit.kredit.entities.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusinessHours {

    private String day;

    private String openTime;

    private String closeTime;
}
