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
    private String phoneNumber;
    private String voen;
    private String organisation;
    private String title;
    private String fullName;
}
