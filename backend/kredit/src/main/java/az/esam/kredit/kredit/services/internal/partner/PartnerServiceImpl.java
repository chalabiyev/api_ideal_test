package az.esam.kredit.kredit.services.internal.partner;

import az.esam.kredit.kredit.dtos.requests.PartnerFormRequest;
import az.esam.kredit.kredit.dtos.requests.RegisterRequest;
import az.esam.kredit.kredit.entities.Partner;
import az.esam.kredit.kredit.entities.enums.EFinalStatus;
import az.esam.kredit.kredit.repositories.PartnerRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class PartnerServiceImpl implements PartnerService {

    @Autowired
    PartnerRepository partnerRepository;

    @Autowired
    StorageService storageService;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    AuthenticationService authenticationService;

    @Override
    public Partner submitForm(PartnerFormRequest request) {
        Partner partner = Partner.builder()
                .companyName(request.getCompanyName())
                .directorName(request.getDirectorName())
                .voen(request.getVoen())
                .image(request.getImage())
                .url(request.getUrl())
                .monthlySales(request.getMonthlySales())
                .activityType(request.getActivityType())
                .companyImages(request.getCompanyImages())
                .city(request.getCity())
                .address(request.getAddress())
                .phoneNumber(request.getPhoneNumber())
                .status(EFinalStatus.PENDING)
                .build();
        return partnerRepository.save(partner);
    }

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

    @Override
    public Partner changeStatus(String id, String status, Authentication authentication) throws BadRequestException {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner tapılmadı"));
        partner.setStatus(EFinalStatus.valueOf(status));

        if (EFinalStatus.ACCEPTED.equals(EFinalStatus.valueOf(status))) {
            // TODO: create user on partner role
            authenticationService.register(RegisterRequest.builder()
                    .username(partner.getPhoneNumber())
                    .password("123456")
                    .phoneNumber(partner.getPhoneNumber())
                    .roles(Set.of("partner"))
                    .build(), authentication);
        }

        return partnerRepository.save(partner);
    }
}
