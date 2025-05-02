package az.esam.kredit.kredit.dtos.responses.asanfinance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AsanFinanceResponse<T> {

    public AsanFinanceResponse() {

    }

    @JsonProperty("RequestIdentifier")
    private String RequestIdentifier;
    @JsonProperty("Status")
    private Status Status;
    @JsonProperty("Response")
    private T Response;

    public String getRequestIdentifier() {
        return RequestIdentifier;
    }

    public void setRequestIdentifier(String requestIdentifier) {
        RequestIdentifier = requestIdentifier;
    }

    public Status getStatus() {
        return Status;
    }

    public void setStatus(Status status) {
        Status = status;
    }

    public T getResponse() {
        return Response;
    }

    public void setResponse(T response) {
        Response = response;
    }
}
