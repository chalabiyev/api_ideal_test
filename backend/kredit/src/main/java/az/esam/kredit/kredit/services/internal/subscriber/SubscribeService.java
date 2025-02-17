package az.esam.kredit.kredit.services.internal.subscriber;

import az.esam.kredit.kredit.dtos.requests.SubscribeRequest;
import az.esam.kredit.kredit.entities.content_management.Subscriber;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface SubscribeService {

    boolean subscribe(SubscribeRequest request) throws BadRequestException;

    boolean unsubscribe(SubscribeRequest request) throws BadRequestException;

    boolean sendCampaignEmail(String campaignId);

    List<Subscriber> list();

    boolean changeStatus(String email);
}
