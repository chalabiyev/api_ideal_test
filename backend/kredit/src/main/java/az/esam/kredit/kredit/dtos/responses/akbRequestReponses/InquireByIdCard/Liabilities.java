package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.EmptyStringAsNullDeserializer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Liabilities {

    @JsonProperty("liability")
    @JsonDeserialize(using = EmptyStringAsNullDeserializer.class)
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_CASE_INSENSITIVE_PROPERTIES)
    private List<Liability> liability;
}
