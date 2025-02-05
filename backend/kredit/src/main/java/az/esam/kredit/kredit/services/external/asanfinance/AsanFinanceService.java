package az.esam.kredit.kredit.services.external.asanfinance;

import az.esam.kredit.kredit.dtos.responses.asanfinance.AsanFinanceResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.farm.FarmInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.PersonalInfoAllResponse;
import com.fasterxml.jackson.databind.JsonNode;

public interface AsanFinanceService {

    AsanFinanceResponse<FarmInfoResponse> getFarmInfoByPin(String pin);

    AsanFinanceResponse<FarmInfoResponse> getFarmInfoByVoen(String voen);

    AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoAllByPin(String pin);

    AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoByPin(String pin);

    AsanFinanceResponse<EmployeeInfoResponse> getEmployeeInfoByPin(String pin);

    AsanFinanceResponse<PensionerInfoResponse> getPensionerInfoByPin(String pin);

    JsonNode getForeignPassportInfoByPin(String pin);

    JsonNode getVinInfoByVin(String vin);

    JsonNode getVoenInfoByVoen(String voen);

    JsonNode getPersonalInfoByPinAndDocument(String pin, String documentNumber);

    JsonNode getExpensesInfo();

    JsonNode getPaymentsInfo();

    JsonNode getBalanceInfo();

}
