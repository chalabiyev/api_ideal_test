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
        return interestRate / 1200;
    }

    @Override
    public double calculateMonthlyPayment(double creditAmount, double annualInterestRate, int creditPeriod) {
        double monthlyInterestRate = calculateMonthlyInterestRate(annualInterestRate);
        if (monthlyInterestRate == 0) {
            return -(creditAmount / creditPeriod); // If 0% interest
        }

        double monthlyAmount = (creditAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -creditPeriod)); // Make it positive, like in Excel

        // round to 2 decimal places
        return Math.round(monthlyAmount * 100.0) / 100.0;
    }

    @Override
    public List<PaymentTableContent> calculatePaymentTable(String creditRequestId, double creditAmount, double interestRate, int creditPeriod) {
        double monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
        double monthlyPayment = calculateMonthlyPayment(creditAmount, interestRate, creditPeriod);
        double remainingCreditAmount = creditAmount;

        List<PaymentTableContent> paymentTable = new ArrayList<>();

        for (int i = 0; i < creditPeriod; i++) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MONTH, i);
            double interestAmount = Math.round(remainingCreditAmount * monthlyInterestRate * 100.0) / 100.0;
            double principalAmount = Math.round((monthlyPayment - interestAmount) * 100.0) / 100.0;
            remainingCreditAmount = Math.round((remainingCreditAmount + interestAmount - monthlyPayment) * 100.0) / 100.0;

            if (i == creditPeriod - 1 && Math.abs(remainingCreditAmount) <= 0.01) {
                remainingCreditAmount = 0.00;
            }

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
