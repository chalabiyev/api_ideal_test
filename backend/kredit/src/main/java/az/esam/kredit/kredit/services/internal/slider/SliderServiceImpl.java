package az.esam.kredit.kredit.services.internal.slider;

import az.esam.kredit.kredit.entities.content_management.Slider;
import az.esam.kredit.kredit.repositories.content_management.SliderRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class SliderServiceImpl implements SliderService {

    @Autowired
    SliderRepository sliderRepository;

    @Autowired
    StorageService storageService;

    @Override
    public Slider add(Slider slider) {
        return sliderRepository.save(slider);
    }

    @Override
    public Slider update(Slider slider) {
        return sliderRepository.save(slider);
    }

    @Override
    public Slider get(String id) {
        return sliderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slider tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            Slider slider = sliderRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Slider tapılmadı"));
            if (slider.getImage() != null && !slider.getImage().isEmpty()) {
                storageService.deleteExistingImages(slider.getImage());
            }
            sliderRepository.delete(slider);
            return true;
        } catch (Exception e) {
            log.error("Slider silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<Slider> list() {
        return sliderRepository.findAll();
    }

    @Override
    public Long count() {
        return sliderRepository.count();
    }
}
