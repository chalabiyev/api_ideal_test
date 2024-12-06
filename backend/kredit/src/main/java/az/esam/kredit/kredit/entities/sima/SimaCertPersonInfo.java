package az.esam.kredit.kredit.entities.sima;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author cihan
 */
@Data
@Builder
public class SimaCertPersonInfo {

    private String finCode;
    private String name;
    private String surName;
    private String fatherName;
}
