package az.esam.kredit.kredit.utility;

public interface CreditCalculation {

    double calculateMonthlyInterestRate(double interestRate);

    double calculateAnnuityFactor(double interestRate, int creditPeriod);

    double calculateMonthlyPayment(double creditAmount, double monthlyInterestRate, int creditPeriod);

}
