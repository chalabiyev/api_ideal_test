package az.esam.kredit.kredit.services.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JsonParserService {
    private static final Logger log = LoggerFactory.getLogger(JsonParserService.class);

    public <T> List<T> parseResponse(JsonNode jsonResponse, Class<T> clazz) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode dataNode = jsonResponse.get("data");
            if (dataNode != null) {
                if (dataNode.isArray()) {
                    return objectMapper.readValue(
                            dataNode.toString(),
                            objectMapper.getTypeFactory().constructCollectionType(List.class, clazz)
                    );
                } else if (dataNode.isObject()) {
                    return List.of(objectMapper.readValue(dataNode.toString(), clazz));
                } else if (dataNode.isValueNode()) {
                    // Handle primitive value
                    if (clazz == String.class) {
                        return List.of(clazz.cast(dataNode.asText()));
                    } else if (clazz == Integer.class) {
                        return List.of(clazz.cast(dataNode.asInt()));

                    } else if (clazz == Boolean.class) {
                        return List.of(clazz.cast(dataNode.asBoolean()));

                    } else if (clazz == Double.class) {
                        return List.of(clazz.cast(dataNode.asDouble()));

                    } else if (clazz == Long.class) {
                        return List.of(clazz.cast(dataNode.asLong()));

                    } else {
                        log.error("Unsupported primitive type for 'data': {}", clazz.getName());
                        throw new IllegalArgumentException("Unsupported primitive type for 'data': " + clazz.getName());
                    }
                }
            }
        } catch (Exception ex) {
            log.error("Failed to parse JSON response.", ex);
            return null;
        }
        return null;
    }
}
