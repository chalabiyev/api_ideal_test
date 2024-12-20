package az.esam.kredit.kredit.services.internal.creditType;

import az.esam.kredit.kredit.entities.CreditType;
import az.esam.kredit.kredit.repositories.CreditTypeRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CreditTypeServiceImpl implements CreditTypeService {

    @Autowired
    CreditTypeRepository creditTypeRepository;

    @Autowired
    StorageService storageService;

    @Override
    public CreditType add(CreditType creditType) {
        return creditTypeRepository.save(creditType);
    }

    @Override
    public CreditType update(CreditType creditType) {
        return creditTypeRepository.save(creditType);
    }

    @Override
    public CreditType get(String id) {
        return creditTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kredit tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            CreditType creditType = creditTypeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Kredit tapılmadı"));
            if (creditType.getImage() != null && !creditType.getImage().isEmpty()) {
                storageService.deleteExistingImages(creditType.getImage());
            }
            if (creditType.getBannerImage() != null && !creditType.getBannerImage().isEmpty()) {
                storageService.deleteExistingImages(creditType.getBannerImage());
            }
            creditTypeRepository.delete(creditType);
            return true;
        } catch (Exception e) {
            log.error("Kredit silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<CreditType> list() {
        return creditTypeRepository.findAll();
    }

    @Override
    public Long count() {
        return creditTypeRepository.count();
    }
}
