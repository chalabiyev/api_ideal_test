package az.esam.kredit.kredit.utility;

import az.esam.kredit.kredit.entities.PaymentTableContent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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

    @Override
    public List<PaymentTableContent> calculatePaymentTable(String creditRequestId, double creditAmount, double interestRate, int creditPeriod) {
        double monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
        double monthlyPayment = calculateMonthlyPayment(creditAmount, monthlyInterestRate, creditPeriod);
        double remainingCreditAmount = creditAmount;

        List<PaymentTableContent> paymentTable = new ArrayList<>();

        for (int i = 0; i < creditPeriod; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MONTH, i);
            double interestAmount = remainingCreditAmount * monthlyInterestRate;
            double principalAmount = monthlyPayment - interestAmount;
            remainingCreditAmount = remainingCreditAmount + interestAmount - monthlyPayment;

            log.info("Interest amount: {}, Principal amount: {}, Remaining credit amount: {}", interestAmount, principalAmount, remainingCreditAmount);

            PaymentTableContent paymentTableContent = PaymentTableContent.builder()
                    .creditRequestId(creditRequestId)
                    .date(calendar.getTime())
                    .monthCount("00" + (i + 1))
                    .payment(monthlyPayment)
                    .principal(principalAmount)
                    .interest(interestAmount)
                    .remainingDebt(remainingCreditAmount)
                    .build();

            paymentTable.add(paymentTableContent);
        }

        return paymentTable;
    }

}
