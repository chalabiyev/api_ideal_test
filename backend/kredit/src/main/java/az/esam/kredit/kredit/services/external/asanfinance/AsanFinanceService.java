package az.esam.kredit.kredit.services.external.asanfinance;

import az.esam.kredit.kredit.dtos.requests.asanfinance.AsanFinanceRequest;
import az.esam.kredit.kredit.dtos.responses.asanfinance.AsanFinanceResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.balance.BalanceInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.expenses.ExpensesResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.farm.FarmInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.passport.PassportInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.payment.PaymentInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.pensioner.PensionerInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.personal.PersonalInfoAllResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.vin.VinInfoResponse;
import az.esam.kredit.kredit.dtos.responses.asanfinance.voen.VoenInfoResponse;

public interface AsanFinanceService {

    AsanFinanceResponse<FarmInfoResponse> getFarmInfoByPin(String pin);

    AsanFinanceResponse<FarmInfoResponse> getFarmInfoByVoen(String voen);

    AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoAllByPin(String pin);

    AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoByPin(String pin);

    AsanFinanceResponse<EmployeeInfoResponse> getEmployeeInfoByPin(String pin);

    AsanFinanceResponse<PensionerInfoResponse> getPensionerInfoByPin(String pin);

    AsanFinanceResponse<PassportInfoResponse> getForeignPassportInfoByPin(String pin);

    AsanFinanceResponse<VinInfoResponse> getVinInfoByVin(String vin);

    AsanFinanceResponse<VoenInfoResponse> getVoenInfoByVoen(String voen);

    AsanFinanceResponse<PersonalInfoAllResponse> getPersonalInfoByPinAndDocument(String pin, String documentNumber);

    AsanFinanceResponse<ExpensesResponse> getExpensesInfo(AsanFinanceRequest asanFinanceRequest);

    AsanFinanceResponse<PaymentInfoResponse> getPaymentsInfo(AsanFinanceRequest asanFinanceRequest);

    AsanFinanceResponse<BalanceInfoResponse> getBalanceInfo(AsanFinanceRequest asanFinanceRequest);

}
