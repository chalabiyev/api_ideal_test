package az.esam.kredit.kredit.helper;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class FIDFCalculator {

    // Maksimum iterasyon sayısı
    private static final int MAX_ITERATIONS = 100;
    // İterasyon bitiş hassasiyeti
    private static final double EPSILON = 1e-6;

    /**
     * FİFD (Efektif Yıllık Faiz Oranı) hesaplayan metod
     *
     * @param loanAmount   Kredi tutarı (net elde edilen)
     * @param payments     Taksit ödemeleri dizisi
     * @param paymentDates Taksit ödeme tarihleri
     * @param startDate    Kredinin verildiği tarih
     * @return Hesaplanan FİFD oranı (örneğin: 0.25 = %25)
     */
    public static double calculateFIDF(double loanAmount, Double[] payments, LocalDate[] paymentDates,
            LocalDate startDate) {
        double guess = 0.1; // Başlangıç tahmini %10

        for (int i = 0; i < MAX_ITERATIONS; i++) {
            double npv = calculateNPV(loanAmount, payments, paymentDates, startDate, guess);
            double derivative = calculateDerivative(loanAmount, payments, paymentDates, startDate, guess);

            if (Math.abs(npv) < EPSILON)
                break;

            guess = guess - npv / derivative;
        }

        return guess;
    }

    /**
     * Net bugünkü değer (NPV) fonksiyonu
     */
    private static double calculateNPV(double loanAmount, Double[] payments, LocalDate[] paymentDates,
            LocalDate startDate, double rate) {
        double npv = -loanAmount;

        for (int i = 0; i < payments.length; i++) {
            double years = calculateYearDiff(startDate, paymentDates[i]);
            npv += payments[i] / Math.pow(1 + rate, years);
        }

        return npv;
    }

    /**
     * NPV'nin türevi
     */
    private static double calculateDerivative(double loanAmount, Double[] payments, LocalDate[] paymentDates,
            LocalDate startDate, double rate) {
        double derivative = 0;

        for (int i = 0; i < payments.length; i++) {
            double years = calculateYearDiff(startDate, paymentDates[i]);
            derivative += (-years * payments[i]) / Math.pow(1 + rate, years + 1);
        }

        return derivative;
    }

    /**
     * İki tarih arasındaki farkı yıl cinsinden döner
     */
    private static double calculateYearDiff(LocalDate start, LocalDate end) {
        long days = ChronoUnit.DAYS.between(start, end);
        return days / 365.0;
    }

}