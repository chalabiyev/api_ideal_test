package az.esam.kredit.kredit.utility;

import az.esam.kredit.kredit.entities.PaymentTableContent;

import java.util.List;

public interface CreditCalculation {

    double calculateMonthlyInterestRate(double interestRate);

    double calculateAnnuityFactor(double interestRate, int creditPeriod);

    double calculateMonthlyPayment(double creditAmount, double monthlyInterestRate, int creditPeriod);

    List<PaymentTableContent> calculatePaymentTable(String creditRequestId, double creditAmount, double interestRate, int creditPeriod);
}
