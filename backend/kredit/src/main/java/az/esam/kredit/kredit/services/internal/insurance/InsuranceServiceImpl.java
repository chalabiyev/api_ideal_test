package az.esam.kredit.kredit.services.internal.insurance;

import az.esam.kredit.kredit.entities.content_management.Insurance;
import az.esam.kredit.kredit.repositories.content_management.InsuranceRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class InsuranceServiceImpl implements InsuranceService {

    @Autowired
    InsuranceRepository insuranceRepository;

    @Autowired
    StorageService storageService;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Insurance add(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

    @Override
    public Insurance update(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

    @Override
    public Insurance get(String id) {
        return insuranceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sığorta tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            Insurance insurance = insuranceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Sığorta tapılmadı"));
            if (insurance.getImage() != null && !insurance.getImage().isEmpty()) {
                storageService.deleteExistingImages(insurance.getImage());
            }
            insuranceRepository.delete(insurance);
            return true;
        } catch (Exception e) {
            log.error("Sığorta silinmədi", e.getMessage());
            return false;
        }
    }

    @Override
    public List<List<Insurance>> list() {
        List<List<Insurance>> result = new ArrayList<>();
        Query query = new Query();
        query.addCriteria(Criteria.where("insuranceType").is("INDIVIDUAL"));
        List<Insurance> individual = mongoTemplate.find(query, Insurance.class);

        query = new Query();
        query.addCriteria(Criteria.where("insuranceType").is("COOPERATIVE"));
        List<Insurance> cooperative = mongoTemplate.find(query, Insurance.class);

        result.add(individual);
        result.add(cooperative);
        return result;
    }

    @Override
    public List<Insurance> listAll() {
        return insuranceRepository.findAll();
    }

    @Override
    public Long count() {
        return insuranceRepository.count();
    }
}
