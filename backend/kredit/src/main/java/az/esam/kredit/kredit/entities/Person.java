package az.esam.kredit.kredit.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Person {
    
    private int id;
    private String name;
    private String note;
    private String phone;
    private String relation;

}
