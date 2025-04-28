package az.esam.kredit.kredit.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdditionalIncome {

    private int id;
    private String source;
    private String amount;

}