package az.esam.kredit.kredit.utility;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CreditCalculationImpl implements CreditCalculation {

    @Override
    public double calculateMonthlyInterestRate(double interestRate) {
        return interestRate / 12;
    }

    @Override
    public double calculateAnnuityFactor(double interestRate, int creditPeriod) {
        double monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
        return (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, creditPeriod)) / (Math.pow(1 + monthlyInterestRate, creditPeriod) - 1);
    }

    @Override
    public double calculateMonthlyPayment(double creditAmount, double monthlyInterestRate, int creditPeriod) {
        return creditAmount * calculateAnnuityFactor(monthlyInterestRate, creditPeriod);
    }

}
