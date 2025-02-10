package az.esam.kredit.kredit.services.internal.info;

import az.esam.kredit.kredit.entities.content_management.Info;
import az.esam.kredit.kredit.repositories.content_management.InfoRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class InfoServiceImpl implements InfoService {

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    StorageService storageService;

    @Override
    public Info add(Info info) {
        return infoRepository.save(info);
    }

    @Override
    public Info update(Info info) {
        return infoRepository.save(info);
    }

    @Override
    public Info get(String id) {
        return infoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Məlumat tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            Info info = infoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Məlumat tapılmadı"));
            if (info.getImage() != null && !info.getImage().isEmpty()) {
                storageService.deleteExistingImages(info.getImage());
            }

            infoRepository.delete(info);
            return true;
        } catch (Exception e) {
            log.error("Məlumat silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<Info> list() {
        return infoRepository.findAll();
    }

    @Override
    public Long count() {
        return infoRepository.count();
    }
}
