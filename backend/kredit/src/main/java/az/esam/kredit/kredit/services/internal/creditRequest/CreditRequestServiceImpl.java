package az.esam.kredit.kredit.services.internal.creditRequest;

import az.esam.kredit.kredit.dtos.requests.CreditRequestSearchDto;
import az.esam.kredit.kredit.entities.Credit;
import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.*;
import az.esam.kredit.kredit.entities.sima.ContractTypeEnum;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;
import az.esam.kredit.kredit.repositories.CreditRepository;
import az.esam.kredit.kredit.repositories.CreditRequestRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.external.sms.SMSService;
import az.esam.kredit.kredit.services.sima.SimaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;

@Slf4j
@Service
public class CreditRequestServiceImpl implements CreditRequestService {

    @Autowired
    CreditRequestRepository creditRequestRepository;

    @Autowired
    SimaService simaService;

    @Autowired
    CreditRepository creditRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SMSService smsService;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public CreditRequest create(CreditRequest request, Authentication authentication) {

        request.setRequestDate(new Date());
        if (request.getCreditAmount() == null) {
            request.setCreditAmount(499d);
        }

        if (request.getServiceRate() == null) {
            request.setServiceRate(1.5);
        }
        if (request.getCartCost() == null) {
            request.setCartCost(10.0);
        }
        if (request.getInsuranceCost() == null) {
            request.setInsuranceCost(1.0);
        }
        if (request.getValuationCost() == null) {
            request.setValuationCost(100.0);
        }

        if (request.getAnnualPercent() == null) {
            request.setAnnualPercent(28.0);
        }

        double amountToPay = request.getCreditAmount()
                - (request.getCreditAmount() * request.getServiceRate())
                - (request.getCreditAmount() * request.getInsuranceCost())
                - request.getCartCost()
                - request.getValuationCost();

        request.setAmountToBePaid(amountToPay);

        request.setConfirmStatus(CreditRequestStatusEnum.Requested);

        // muracite baxilir sms
        smsService.sendSMS(request.getRequestedUser().getPhoneNumber(),
                "Sizin kredit muracietiniz qebul olundu, tezliklə sizə status barədə məlumat veriləcək");

        creditRequestRepository.insert(request);
        if (request.getPartner() != null) {
            request.setCreditType(ECreditType.PARTNER_CREDIT);
        } else if (request.getCreditAmount() > 500d) {
            request.setCreditType(ECreditType.ABOVE_500);
        } else if (request.getCreditAmount() < 500d) {
            request.setCreditType(ECreditType.BELOW_500);
        }

        boolean flag = false;
        if (request.getCreditType() != null && request.getCreditType().equals(ECreditType.BELOW_500)) {
//        Müraciətçinin 30 gündən çox gecikən aktiv krediti varsa kredit təsdiq olunmasın.
//        Müraciətçinin yaşı məsələn 20-70 yaş aralığında olmalıdır.
//        Müraciətçinin Rəsmi gəliri 350 manat və ondan yuxarı olsun.

            int age = new Date().getYear() - request.getRequestedUser().getBirthDate().getYear();
            if (age < 20 || age > 70) {
                request.setConfirmStatus(CreditRequestStatusEnum.Rejected);
                request.setConfirmerComment("Yaş limiti 20-70 aralığında olmalıdır");
                creditRequestRepository.save(request);
                flag = true;
            }

            if (request.getRequestedUser().getSalary() < 350) {
                request.setConfirmStatus(CreditRequestStatusEnum.Rejected);
                request.setConfirmerComment("Rəsmi gəlir 350 manatdan aşağı olmamalıdır");
                creditRequestRepository.save(request);
                flag = true;
            }

            // TODO check if user has active credit
            if (!flag) {
                request.setConfirmStatus(CreditRequestStatusEnum.Accepted);
                request.setActivateStatus(EActivateStatus.PENDING);

                // muraciet tesdiqlendi sms
                smsService.sendSMS(request.getRequestedUser().getPhoneNumber(),
                        "Sizin kredit muracietiniz təsdiqləndi, mobil nömrə və şifrə vasitəsilə aşağıdakı linkdən hesabınıza daxil olub və krediti aktivləşdirin \nhttps://kreditminimal.studentall.az/");

                creditRequestRepository.save(request);
            }
        }

        return request;
    }

    @Override
    public SimaQRResponse activate(String creditRequestId, Authentication authentication) {
        var user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(creditRequestId)
                .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));
        if (creditRequest.getRequestedUser().getId().equals(user.getId())
                && creditRequest.getConfirmStatus() == CreditRequestStatusEnum.Accepted
                && creditRequest.getActivateStatus() == EActivateStatus.PENDING) {
            // sign with sima
            SimaQRResponse simaQRResponse = simaService.getAuthQR(creditRequest.getRequestedUser().getPin(), ContractTypeEnum.Sign);

            creditRequest.setActivateStatus(EActivateStatus.ACTIVATED);
            creditRequest.setFinalStatus(EFinalStatus.ACCEPTED);
            creditRequestRepository.save(creditRequest);

            // create credit in sima
            creditRepository.save(toCredit(creditRequest, simaQRResponse.getOperationId()));

            // send sms to user
            smsService.sendSMS(creditRequest.getRequestedUser().getPhoneNumber(),
                    "Sizin adınıza İdeal BOKT-da " + creditRequest.getCreditAmount() + " AZN kredit aktivləşdirildi, kredit məlumatları üçün https://kreditminimal.studentall.az/ saytına daxil olun");
            return simaQRResponse;
        } else {
            return null;
        }
    }

    @Override
    public CreditRequest update(CreditRequest request) {
        return creditRequestRepository.save(request);
    }

    @Override
    public Boolean delete(String id) {
        try {
            CreditRequest creditRequest = creditRequestRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));
            creditRequestRepository.delete(creditRequest);
            return true;
        } catch (Exception e) {
            log.error("Error while deleting credit request", e);
            return false;
        }
    }

    @Override
    public CreditRequest get(String id, Authentication authentication) {
        var user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(id).orElseThrow();
        if (user.getRoles().stream().filter(f -> f.getName() == ERole.ROLE_ADMIN).count() == 0) {
            if (creditRequest.getRequestedUser().getId().equals(user.getId())) {
                return creditRequest;
            } else {
                return null;
            }
        } else {
            return creditRequest;
        }
    }

    @Override
    public List<CreditRequest> list() {
        return creditRequestRepository.findAll();
    }

    @Override
    public Long count() {
        return creditRequestRepository.count();
    }

    public Credit toCredit(CreditRequest creditRequest, String simaContractOperationId) {
        return Credit.builder()
                .phoneNumber(creditRequest.getRequestedUser().getPhoneNumber())
                .otherPhoneNumbers(creditRequest.getOtherPhoneNumbers())
                .creditAmount(creditRequest.getCreditAmount())
                .creditTerm(creditRequest.getCreditTerm())
                .creditAmountWithText(creditRequest.getCreditAmountWithText())
                .requestDate(creditRequest.getRequestDate())
                .confirmerUser(creditRequest.getConfirmerUser())
                .isConnectedWithBOKT(creditRequest.isConnectedWithBOKT())
                .confirmDate(creditRequest.getConfirmDate())
                .confirmerComment(creditRequest.getConfirmerComment())
                .creditType(creditRequest.getCreditType())
                .serviceRate(creditRequest.getServiceRate())
                .cartCost(creditRequest.getCartCost())
                .insuranceCost(creditRequest.getInsuranceCost())
                .valuationCost(creditRequest.getValuationCost())
                .monthlyPayment(creditRequest.getMonthlyPayment())
                .amountToBePaid(creditRequest.getAmountToBePaid())
                .creditPurpose(creditRequest.getCreditPurpose())
                .annualPercent(creditRequest.getAnnualPercent())
                .otherPayment(creditRequest.getOtherPayment())
                .notarialCost(creditRequest.getNotarialCost())
                .insuranceType(creditRequest.getInsuranceType())
                .guarantee(creditRequest.getGuarantee())
                .spouses(creditRequest.getSpouses())
                .fine(creditRequest.getFine())
                .simaContractOperationId(simaContractOperationId)
                .build();
    }

    @Override
    public Page<CreditRequest> search(CreditRequestSearchDto search) {
        Query q = new Query().skip(search.getPage() * search.getPageSize())
                .limit(search.getPageSize());
        if (search.getCreditType() != null && !search.getCreditType().isEmpty()) {
            q.addCriteria(Criteria.where("creditType").is(ECreditType.valueOf(search.getCreditType()).name()));
        }
        if (search.getSearch() != null && search.getSearch().trim().length() > 0) {
            Criteria c = Criteria
                    .where("id").ne(null)
                    .orOperator(
                            Criteria.where("username").regex(search.getSearch()),
                            Criteria.where("pin").regex(search.getSearch()),
                            Criteria.where("seriaNo").regex(search.getSearch()),
                            Criteria.where("fullName").regex(search.getSearch()),
                            Criteria.where("name").regex(search.getSearch()),
                            Criteria.where("surname").regex(search.getSearch()),
                            Criteria.where("phoneNumber").regex(search.getSearch()),
                            Criteria.where("email").regex(search.getSearch()));

            List<User> users = mongoTemplate.find(Query.query(c), User.class);
            q.addCriteria(Criteria
                    .where("id").ne(null)
                    .orOperator(
                            Criteria.where("creditPurpose").regex(search.getSearch()),
                            Criteria.where("requestedUser").in(users)));
        }

        List<CreditRequest> list = mongoTemplate.find(q.with(Sort.by(Sort.Order.desc("requestDate"))), CreditRequest.class);

        return PageableExecutionUtils.getPage(
                list,
                list.isEmpty() ? Pageable.unpaged() : Pageable.ofSize(list.size()).withPage(search.getPage()),
                () -> mongoTemplate.count(Query.of(q).limit(-1).skip(-1), CreditRequest.class));

    }

    @Override
    public Long countOf(ECreditType creditType) {
        return creditRequestRepository.countByCreditType(creditType);
    }

    @Override
    public CreditRequest acceptByAdmin(String creditRequestId, Authentication authentication) {
        var user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(creditRequestId)
                .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));

        creditRequest.setConfirmStatus(CreditRequestStatusEnum.Accepted);
        creditRequest = creditRequestRepository.save(creditRequest);
        // send sms to user
        smsService.sendSMS(creditRequest.getRequestedUser().getPhoneNumber(),
                "Sizin adınıza İdeal BOKT-da " + creditRequest.getCreditAmount() + " AZN kredit təsdiq edildi, kredit məlumatları üçün https://kreditminimal.studentall.az/ saytına daxil olun");

        return creditRequest;
    }

    @Override
    public CreditRequest rejectByAdmin(String creditRequestId, Authentication authentication) {
        var user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(creditRequestId)
                .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));

        creditRequest.setConfirmStatus(CreditRequestStatusEnum.Rejected);
        creditRequest.setActivateStatus(EActivateStatus.REJECTED);
        creditRequest.setFinalStatus(EFinalStatus.REJECTED);
        creditRequest = creditRequestRepository.save(creditRequest);
        // send sms to user
        smsService.sendSMS(creditRequest.getRequestedUser().getPhoneNumber(),
                "Sizin adınıza İdeal BOKT-da " + creditRequest.getCreditAmount() + " AZN kredit ləğv edildi, kredit məlumatları üçün https://kreditminimal.studentall.az/ saytına daxil olun");

        return creditRequest;
    }
}
