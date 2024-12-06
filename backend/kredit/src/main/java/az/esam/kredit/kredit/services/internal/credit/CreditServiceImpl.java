package az.esam.kredit.kredit.services.internal.credit;

import az.esam.kredit.kredit.entities.Credit;
import az.esam.kredit.kredit.repositories.CreditRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CreditServiceImpl implements CreditService {

    @Autowired
    CreditRepository creditRepository;

    @Autowired
    StorageService storageService;

    @Override
    public Credit add(Credit credit) {
        return creditRepository.save(credit);
    }

    @Override
    public Credit update(Credit credit) {
        return creditRepository.save(credit);
    }

    @Override
    public Credit get(String id) {
        return creditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kredit tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            Credit credit = creditRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Kredit tapılmadı"));
            if (credit.getImage() != null && !credit.getImage().isEmpty()) {
                storageService.deleteExistingImages(credit.getImage());
            }
            if (credit.getBannerImage() != null && !credit.getBannerImage().isEmpty()) {
                storageService.deleteExistingImages(credit.getBannerImage());
            }
            creditRepository.delete(credit);
            return true;
        } catch (Exception e) {
            log.error("Kredit silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<Credit> list() {
        return creditRepository.findAll();
    }

    @Override
    public Long count() {
        return creditRepository.count();
    }
}
