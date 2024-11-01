package az.esam.kredit.kredit.services.external.sms;

public interface SMSService {

    int getSMSBalance();

    boolean sendSMS(String phoneNumber, String otpCode);
}
