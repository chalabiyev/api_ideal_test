package az.esam.kredit.kredit.services.internal.contactInfo;

import az.esam.kredit.kredit.entities.content_management.ContactInfo;
import az.esam.kredit.kredit.repositories.content_management.ContactInfoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ContactInfoServiceImpl implements ContactInfoService {

    @Autowired
    ContactInfoRepository contactInfoRepository;

    @Override
    public ContactInfo add(ContactInfo request) {
        if (!contactInfoRepository.findAll().isEmpty()) {
            throw new RuntimeException("Kontakt məlumat tapılmadı");
        }

        return contactInfoRepository.insert(request);
    }

    @Override
    public ContactInfo update(ContactInfo request) {
        if (!contactInfoRepository.existsById(request.getId())) {
            throw new RuntimeException("Kontakt məlumat tapılmadı");
        }

        return contactInfoRepository.save(request);
    }

    @Override
    public boolean delete(String id) {
        try {
            ContactInfo contactInfo = contactInfoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Kontakt məlumat tapılmadı"));

            contactInfoRepository.delete(contactInfo);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<ContactInfo> list() {
        return contactInfoRepository.findAll();
    }

    @Override
    public ContactInfo get(String id) {
        return contactInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kontakt məlumat tapılmadı"));
    }

    @Override
    public long count() {
        return contactInfoRepository.count();
    }
}
