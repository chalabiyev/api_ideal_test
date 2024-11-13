package az.esam.kredit.kredit.services.external.akb;

import com.fasterxml.jackson.databind.JsonNode;

public interface AKBService {

    JsonNode getBatchStatus(String batchid);

}
