package az.esam.kredit.kredit.services.internal.campaign;

import az.esam.kredit.kredit.entities.content_management.Campaign;
import az.esam.kredit.kredit.repositories.content_management.CampaignRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    CampaignRepository campaignRepository;

    @Autowired
    StorageService storageService;

    @Override
    public Campaign add(Campaign campaign) {
        validateDisplayOnHome(campaign, campaign.isShowOnMainPage());

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign update(Campaign campaign) {
        if (!campaignRepository.existsById(campaign.getId())) {
            throw new RuntimeException("Kampaniya tapılmadı");
        }
        validateDisplayOnHome(campaign, campaign.isShowOnMainPage());
        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign get(String id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kampaniya tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            Campaign campaign = campaignRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Kampaniya tapılmadı"));
            if (campaign.getImage() != null && !campaign.getImage().isEmpty()) {
                storageService.deleteExistingImages(campaign.getImage());
            }
            campaignRepository.delete(campaign);
            return true;
        } catch (Exception e) {
            log.error("Kampaniya silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<Campaign> list() {
        return campaignRepository.findAllByOrderByCreatedDate();
    }

    @Override
    public Long count() {
        return campaignRepository.count();
    }

    @Override
    public Campaign changeDisplayOnHome(String id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kampaniya tapılmadı"));

        validateDisplayOnHome(campaign, !campaign.isShowOnMainPage());
        campaign.setShowOnMainPage(!campaign.isShowOnMainPage());
        return campaignRepository.save(campaign);
    }

    @Override
    public List<Campaign> listHomeCampaigns() {
        return campaignRepository.findAllByShowOnMainPageTrue();
    }

    private void validateDisplayOnHome(Campaign request, boolean showOnMainPage) {
        long count = campaignRepository.countByShowOnMainPageTrue();
        List<Campaign> campaigns = campaignRepository.findAllByShowOnMainPageTrue();
        boolean isExist = false;
        if (request.getId() != null) {
            isExist = campaigns.stream().anyMatch(campaign -> campaign.getId().equals(request.getId()));
        }
        if (count >= 2 && showOnMainPage && !isExist) {
            throw new RuntimeException("Əsas səhifədə yalnız 2 kampaniya göstərilə bilər");
        }
    }
}
