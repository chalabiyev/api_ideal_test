package az.esam.kredit.kredit.sms;

public interface SMSService {

    int getSMSBalance();

    boolean sendSMS(String phoneNumber, String otpCode);
}
