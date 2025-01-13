package az.esam.kredit.kredit.services.external.sms;

import az.esam.kredit.kredit.dtos.requests.NToNRequest;
import az.esam.kredit.kredit.dtos.requests.SendSmsRequest;
import az.esam.kredit.kredit.dtos.responses.sms.SmsResponse;
import az.esam.kredit.kredit.dtos.responses.sms.SmsStatusResponse;

import java.util.List;

public interface SMSService {

    int getSMSBalance();

    List<SmsResponse> sendSMSOneToN(SendSmsRequest request);

    List<SmsResponse> sendSMSNToN(List<NToNRequest> messages);

    List<SmsStatusResponse> getSMSStatus(List<String> messageIds);
}
