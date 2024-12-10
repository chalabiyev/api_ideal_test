package az.esam.kredit.kredit.services.internal.partner;

import az.esam.kredit.kredit.entities.Partner;
import az.esam.kredit.kredit.repositories.PartnerRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PartnerServiceImpl implements PartnerService {

    @Autowired
    PartnerRepository partnerRepository;

    @Autowired
    StorageService storageService;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Partner add(Partner partner) {
        return partnerRepository.save(partner);
    }

    @Override
    public Partner update(Partner partner) {
        return partnerRepository.save(partner);
    }

    @Override
    public Partner get(String id) {
        return partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            Partner partner = partnerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Partner tapılmadı"));
            if (partner.getImage() != null && !partner.getImage().isEmpty()) {
                storageService.deleteExistingImages(partner.getImage());
            }
            partnerRepository.delete(partner);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Page<Partner> get(int page, int size) {
        Query query = new Query();

        long total = mongoTemplate.count(query, Partner.class);
        query.skip((long) page * size).limit(size);

        List<Partner> partners = mongoTemplate.find(query, Partner.class);

        return new PageImpl<>(partners, PageRequest.of(page, size), total);
    }

    @Override
    public List<Partner> listAll() {
        return partnerRepository.findAll();
    }

    @Override
    public Long count() {
        return partnerRepository.count();
    }
}
