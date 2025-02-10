package az.esam.kredit.kredit.services.internal.campaign;

import az.esam.kredit.kredit.entities.content_management.Campaign;

import java.util.List;

public interface CampaignService {
    Campaign add(Campaign campaign);

    Campaign update(Campaign campaign);

    Campaign get(String id);

    boolean delete(String id);

    List<Campaign> list();

    Long count();
}

