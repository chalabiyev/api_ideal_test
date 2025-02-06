package az.esam.kredit.kredit.services.external.akb.requestService;

import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByIdCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByPassportRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByServiceCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByTaxNoRequest;
import com.fasterxml.jackson.databind.JsonNode;

public interface AKBRequestService {

    JsonNode inquireByIdCard(InquireByIdCardRequest akbRequest);

    JsonNode inquireByPassport(InquireByPassportRequest akbRequest);

    JsonNode inquireByServiceCard(InquireByServiceCardRequest akbRequest);

    JsonNode inquireByTaxNo(InquireByTaxNoRequest akbRequest);

    JsonNode inquireUtilityServices(String reportId);

    JsonNode getBorrowerScore(String reportId);

    JsonNode getBalance();

    JsonNode lkpBorrInquiryPurposes();

    JsonNode lkpCollateralTypes();

    JsonNode lkpCountries();

    JsonNode lkpCreditClassTypes();

    JsonNode lkpCreditPurposeTypes();

    JsonNode lkpCreditStatusTypes();

    JsonNode lkpCreditTypes();

    JsonNode lkpCurrencies();

}
