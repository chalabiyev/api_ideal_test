package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.Campaign;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CampaignRepository extends MongoRepository<Campaign, String> {
    long countByShowOnMainPageTrue();

    List<Campaign> findAllByShowOnMainPageTrue();

    List<Campaign> findAllByOrderByCreatedDate();
}
