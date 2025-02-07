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

    FarmInfoResponse getFarmInfoByPin(String pin, boolean fetchFromService);

    FarmInfoResponse getFarmInfoByVoen(String voen, boolean fetchFromService);

    PersonalInfoAllResponse getPersonalInfoAllByPin(String pin, boolean fetchFromService);

    PersonalInfoAllResponse getPersonalInfoByPin(String pin, boolean fetchFromService);

    EmployeeInfoResponse getEmployeeInfoByPin(String pin, boolean fetchFromService);

    PensionerInfoResponse getPensionerInfoByPin(String pin, boolean fetchFromService);

    PassportInfoResponse getForeignPassportInfoByPin(String pin, boolean fetchFromService);

    VinInfoResponse getVinInfoByVin(String vin, boolean fetchFromService);

    VoenInfoResponse getVoenInfoByVoen(String voen, boolean fetchFromService);

    PersonalInfoAllResponse getPersonalInfoByPinAndDocument(String pin, String documentNumber, boolean fetchFromService);

    AsanFinanceResponse<ExpensesResponse> getExpensesInfo(AsanFinanceRequest asanFinanceRequest);

    AsanFinanceResponse<PaymentInfoResponse> getPaymentsInfo(AsanFinanceRequest asanFinanceRequest);

    AsanFinanceResponse<BalanceInfoResponse> getBalanceInfo(AsanFinanceRequest asanFinanceRequest);

}
