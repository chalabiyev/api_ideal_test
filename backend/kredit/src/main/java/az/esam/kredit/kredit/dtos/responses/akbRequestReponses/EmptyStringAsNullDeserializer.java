package az.esam.kredit.kredit.dtos.responses.akbRequestReponses;

import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard.History;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class EmptyStringAsNullDeserializer extends JsonDeserializer<Object> {
    @Override
    public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getValueAsString();
        return (value == null || value.trim().isEmpty()) ? null : p.readValueAs(History.class);
    }
}
