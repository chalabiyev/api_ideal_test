package az.esam.kredit.kredit.services.internal.partner;

import az.esam.kredit.kredit.dtos.requests.PartnerFormRequest;
import az.esam.kredit.kredit.dtos.requests.RegisterRequest;
import az.esam.kredit.kredit.dtos.requests.SendSmsRequest;
import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.entities.Partner;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.EFinalStatus;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.repositories.PartnerRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.services.external.sms.SMSService;
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

import java.util.Date;
import java.util.HashSet;
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

    @Autowired
    UserRepository userRepository;

    @Autowired
    SMSService smsService;

    @Override
    public Partner submitForm(PartnerFormRequest request) throws BadRequestException {
        if (partnerRepository.existsByVoen(request.getVoen())) {
            throw new BadRequestException("Bu VÖEN ilə qeydiyyatdan keçmiş partnyor mövcuddur");
        }

        Partner partner = Partner.builder()
                .companyName(request.getCompanyName())
                .directorName(request.getDirectorName())
                .pin(request.getPin())
                .formOfOwnership(request.getFormOfOwnership())
                .voen(request.getVoen())
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
        partner.setStatus(EFinalStatus.NEW);
        return partnerRepository.save(partner);
    }

    @Override
    public Partner update(Partner partner) {
        Partner existingPartner = partnerRepository.findById(partner.getId())
                .orElseThrow(() -> new RuntimeException("Partner tapılmadı"));

        if (partner.getStatus() != null && !partner.getStatus().equals(existingPartner.getStatus())) {
            partner.setStatusUpdatedDate(new Date());
        }

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
        return partnerRepository.findAllByOrderByCreatedDateDesc();
    }

    @Override
    public Long count() {
        return partnerRepository.count();
    }

    @Override
    public Partner changeStatus(String id, String status, Authentication authentication) throws BadRequestException {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner tapılmadı"));

        if (!partner.getStatus().equals(EFinalStatus.ACCEPTED) && EFinalStatus.ACCEPTED.equals(EFinalStatus.valueOf(status))) {
            // check if user exists with partner pin, then add partner role to user
            User existingUser = userRepository.findByUsername(partner.getPin()).orElse(null);
            if (existingUser != null) {
                authenticationService.addRole(existingUser.getUsername(), ERole.ROLE_PARTNER);
                // TODO: sms gonder partner role added
                smsService.sendSMSOneToN(SendSmsRequest.builder()
                        .numbers(List.of(partner.getPhoneNumber()))
                        .message("Sizin partnyorlugunuz uğurla təsdiqləndi. " +
                                "Hesabınıza aşağıdakı url-dən pin və istifadəçi hesabınızın parolu ilə giriş edə bilərsiniz: \n" +
                                "https://admin.idealkredit.az/auth/jwt/sign-in")
                        .build());

                // set user's companys
                if (existingUser.getPartners() == null) {
                    existingUser.setPartners(new HashSet<>());
                }
                existingUser.getPartners().add(partner);
            } else {
                // TODO: create user on partner role
                RegisterRequest registerRequest = RegisterRequest.builder()
                        .fin(partner.getPin())
                        .name(partner.getCompanyName())
                        .surName(partner.getDirectorName())
                        .address(partner.getAddress())
                        .fullName(partner.getCompanyName().concat(" ").concat(partner.getDirectorName()))
                        .username(partner.getPin())
                        .phoneNumber(partner.getPhoneNumber())
                        .roles(Set.of("partner"))
                        .build();

                AuthenticationResponse response = authenticationService.register(registerRequest, authentication);

                existingUser = userRepository.findByUsername(partner.getPin())
                        .orElseThrow(() -> new RuntimeException("User tapılmadı"));
                if (existingUser.getPartners() == null) {
                    existingUser.setPartners(new HashSet<>());
                }
                existingUser.getPartners().add(partner);

                // TODO: sms gonder url?token=accessToken
                smsService.sendSMSOneToN(SendSmsRequest.builder()
                        .numbers(List.of(partner.getPhoneNumber()))
                        .message("Sizin partnyorlugunuz uğurla təsdiqləndi. Şifrənizi yeniləmək üçün bu linkə keçid edin: \n"
                                + "https://kabinet.idealkredit.az/setpassword??token=" + response.getAccessToken()
                                + " Link 24 saat ərzində aktivdir.")
                        .build());
            }
            userRepository.save(existingUser);
        }
        partner.setStatus(EFinalStatus.valueOf(status));
        partner.setStatusUpdatedDate(new Date());

        return partnerRepository.save(partner);
    }

    @Override
    public List<Partner> list() {
        // order by update dat
        return partnerRepository.findByStatusOrderByStatusUpdatedDateDesc(EFinalStatus.ACCEPTED);
    }
}
