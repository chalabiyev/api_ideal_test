package az.esam.kredit.kredit.patch;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class Patcher {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public <T> void patcher(T existing, Map<String, Object> updates) throws IllegalAccessException {
        Class<?> clazz = existing.getClass();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            String fieldName = field.getName();

            if (updates.containsKey(fieldName)) {
                Object newValue = updates.get(fieldName);

                if (field.getType().isAssignableFrom(Set.class) && newValue instanceof List) {
                    // Handle sets
                    handleSetField(existing, field, (List<?>) newValue);

                } else if (field.getType().isAssignableFrom(List.class) && newValue instanceof List) {
                    // Handle lists
                    handleListField(existing, field, (List<?>) newValue);

                } else if (newValue instanceof Map) {
                    // Handle nested objects
                    Object convertedValue = objectMapper.convertValue(newValue, field.getType());
                    field.set(existing, convertedValue);

                } else if (field.getType().isEnum()) {
                    Object enumValue = Enum.valueOf((Class<Enum>) field.getType(), newValue.toString().toUpperCase());  // Convert String to Enum
                    field.set(existing, enumValue);

                } else if (field.getType().equals(Date.class) && newValue instanceof String) {
                    // Handle date parsing
                    Date parsedDate = parseDate((String) newValue);
                    field.set(existing, parsedDate);

                } else if (newValue != null || field.getType().isPrimitive()) {
                    field.set(existing, newValue);
                }
            }

            field.setAccessible(false);
        }
    }

    private Date parseDate(String dateString) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX").parse(dateString); // ISO 8601 format
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format: " + dateString, e);
        }
    }


    private void handleSetField(Object existing, Field field, List<?> newValue) throws IllegalAccessException {
        // Check if the field is a parameterized set
        if (field.getGenericType() instanceof ParameterizedType) {
            Class<?> setType = getSetType(field);

            if (setType.equals(String.class)) {
                // Handle sets of strings
                field.set(existing, new HashSet<>(newValue));

            } else if (setType.isEnum()) {
                // Handle sets of enums
                Set<?> enumSet = newValue.stream()
                        .map(enumValue -> Enum.valueOf((Class<Enum>) setType, enumValue.toString().toUpperCase()))
                        .collect(Collectors.toSet());
                field.set(existing, enumSet);

            } else {
                // Handle sets of other object types
                Set<?> convertedSet = newValue.stream()
                        .map(item -> objectMapper.convertValue(item, setType))
                        .collect(Collectors.toSet());
                field.set(existing, convertedSet);
            }
        }
    }

    // Helper method to get the type of objects inside the Set (e.g., Genre.class from Set<Genre>)
    private Class<?> getSetType(Field field) {
        return (Class<?>) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
    }


    // Helper method to check if the list contains Maps (nested objects)
    private boolean isListOfMaps(List<?> list) {
        return !list.isEmpty() && list.get(0) instanceof Map;
    }

    // Helper method to check if the field is a list of enums
    private boolean isListOfEnums(Field field) {
        return field.getGenericType().toString().contains("Enum");
    }

    // Helper method to get the type of objects inside the List (e.g., Size.class from List<Size>)
    private Class<?> getListType(Field field) {
        return (Class<?>) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
    }

    private void handleListField(Object existing, Field field, List<?> newValue) throws IllegalAccessException {
        // Check if the field is a parameterized list
        if (field.getGenericType() instanceof ParameterizedType) {
            Class<?> listType = getListType(field);

            if (listType.equals(String.class)) {
                // Handle lists of strings
                field.set(existing, newValue);

            } else if (listType.isEnum()) {
                // Handle lists of enums
                List<?> enumList = newValue.stream()
                        .map(enumValue -> Enum.valueOf((Class<Enum>) listType, enumValue.toString().toUpperCase()))
                        .toList();
                field.set(existing, enumList);

            } else if (listType.equals(Map.class)) {
                // Handle lists of maps (nested objects)
                List<?> convertedList = newValue.stream()
                        .map(map -> objectMapper.convertValue(map, listType))
                        .toList();
                field.set(existing, convertedList);

            } else {
                // Handle lists of other object types
                List<?> convertedList = newValue.stream()
                        .map(item -> objectMapper.convertValue(item, listType))
                        .toList();
                field.set(existing, convertedList);
            }
        }
    }
}
