package az.esam.kredit.kredit.services.external.akb.requestService;

import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByIdCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByPassportRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByServiceCardRequest;
import az.esam.kredit.kredit.dtos.requests.akb.request.InquireByTaxNoRequest;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.InquireByIdCard.InquireByIdCardResponse;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBCreditTypeResponse;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBCurrencyResponse;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBStatusResponse;
import az.esam.kredit.kredit.dtos.responses.akbRequestReponses.lkpBorrInquiryPurposes.AKBTypeResponse;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public interface AKBRequestService {

    InquireByIdCardResponse inquireByIdCard(InquireByIdCardRequest akbRequest);

    JsonNode inquireByPassport(InquireByPassportRequest akbRequest);

    JsonNode inquireByServiceCard(InquireByServiceCardRequest akbRequest);

    JsonNode inquireByTaxNo(InquireByTaxNoRequest akbRequest);

    JsonNode inquireUtilityServices(String reportId);

    JsonNode getBorrowerScore(String reportId);

    Double getBalance();

    List<AKBTypeResponse> lkpBorrInquiryPurposes();

    List<AKBTypeResponse> lkpCollateralTypes();

    List<AKBTypeResponse> lkpCountries();

    List<AKBTypeResponse> lkpCreditClassTypes();

    List<AKBTypeResponse> lkpCreditPurposeTypes();

    List<AKBStatusResponse> lkpCreditStatusTypes();

    List<AKBCreditTypeResponse> lkpCreditTypes();

    List<AKBCurrencyResponse> lkpCurrencies();

}
