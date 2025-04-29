package az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.EmptyStringAsNullDeserializer;
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
public class InquiryHistory {
    @JsonProperty("inquiryHistoryItem")
    @JsonDeserialize(using = EmptyStringAsNullDeserializer.class)
    private List<InquiryHistoryItem> inquiryHistoryItem;
}

