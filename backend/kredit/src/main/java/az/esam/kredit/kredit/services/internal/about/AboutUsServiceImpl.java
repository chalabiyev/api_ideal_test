package az.esam.kredit.kredit.services.internal.about;

import az.esam.kredit.kredit.entities.content_management.AboutUs;
import az.esam.kredit.kredit.repositories.content_management.AboutUsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class AboutUsServiceImpl implements AboutUsService {

    @Autowired
    AboutUsRepository aboutUsRepository;

    @Override
    public AboutUs add(AboutUs aboutUs) {
        return aboutUsRepository.save(aboutUs);
    }

    @Override
    public AboutUs update(AboutUs aboutUs) {
        return aboutUsRepository.save(aboutUs);
    }

    @Override
    public AboutUs get(String id) {
        return aboutUsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haqqımızda tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            AboutUs aboutUs = aboutUsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Haqqımızda tapılmadı"));
            aboutUsRepository.delete(aboutUs);
            return true;
        } catch (Exception e) {
            log.error("Haqqımızda silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<AboutUs> list() {
        return aboutUsRepository.findAll();
    }

    @Override
    public Long count() {
        return aboutUsRepository.count();
    }
}
