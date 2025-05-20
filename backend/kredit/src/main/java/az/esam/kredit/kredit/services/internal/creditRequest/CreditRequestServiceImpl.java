package az.esam.kredit.kredit.services.internal.creditRequest;

import az.esam.kredit.kredit.dtos.requests.CreditRequestSearchDto;
import az.esam.kredit.kredit.dtos.requests.SendSmsRequest;
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

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    @Value("${kabinetUrl}")
    private String kabinetUrl;

    @Override
    public CreditRequest create(CreditRequest request, Authentication authentication) {
        if (request.getId() == null || request.getId().isEmpty()) {
            request.setId(new ObjectId().toString());
        }
        request.setRequestDate(new Date());
        Calendar c = Calendar.getInstance();
        c.setTime(request.getRequestDate());
        if (request.getCreditYear() == 0) {
            request.setCreditYear(c.get(Calendar.YEAR));
        }
        if (request.getCreditOrderNo() == 0) {
            request.setCreditOrderNo((int) creditRequestRepository.countByCreditYear(c.get(Calendar.YEAR)) + 1);
        }
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
        request.setActivateStatus(EActivateStatus.PENDING);

        if (request.getPartner() != null) {
            request.setCreditType(ECreditType.PARTNER_CREDIT);
        } else if (request.getCreditAmount() > 500d) {
            request.setCreditType(ECreditType.ABOVE_500);
        } else if (request.getCreditAmount() < 500d) {
            request.setCreditType(ECreditType.BELOW_500);
        }
        boolean controlsEnabled = false;
        boolean flag = false;
        if (request.getCreditType() == null) {
            throw new RuntimeException("Credit type is null");
        }
        if (controlsEnabled) {
            String rejectMessage = "Hormətli müştəri, hazırda daxili şərtlərə uyğun olaraq sizə kredit rəsmiləşdirilə bilməz";
            // Müraciətçinin yaşı məsələn 20-70 yaş aralığında olmalıdır.
            // Müraciətçinin Rəsmi gəliri 350 manat və ondan yuxarı olsun.
            int age = new Date().getYear() - request.getRequestedUser().getBirthDate().getYear();
            if (age < 20 || age > 70) {
                request.setConfirmStatus(CreditRequestStatusEnum.Rejected);
                request.setConfirmerComment("Yaş limiti 20-70 aralığında olmalıdır");
                creditRequestRepository.save(request);
                flag = true;
                smsService.sendSMSOneToN(SendSmsRequest.builder()
                        .message(
                                rejectMessage)
                        .numbers(List.of(request.getRequestedUser().getPhoneNumber()))
                        .build());
                return request;
            }

            if (request.getAdditionalIncomes() != null
                    && !request.getAdditionalIncomes().isEmpty()
                    && request.getAdditionalIncomes().get(0).getAmount() != null
                    && request.getAdditionalIncomes().get(0).getAmount() != null
                    && !request.getAdditionalIncomes().get(0).getAmount().trim().isEmpty()) {
                request.getRequestedUser()
                        .setSalary(request.getRequestedUser().getSalary()
                                + Double.parseDouble(request.getAdditionalIncomes().get(0).getAmount().trim()));
            }

            if (request.getRequestedUser().getSalary() < 350) {
                request.setConfirmStatus(CreditRequestStatusEnum.Rejected);
                request.setConfirmerComment("Rəsmi gəlir 350 manatdan aşağı olmamalıdır");
                creditRequestRepository.save(request);
                flag = true;
                smsService.sendSMSOneToN(SendSmsRequest.builder()
                        .message(
                                rejectMessage)
                        .numbers(List.of(request.getRequestedUser().getPhoneNumber()))
                        .build());
                return request;
            }

            Optional<CreditRequest> credit = creditRequestRepository
                    .findOneByRequestedUserOrderByRequestDateDesc(request.getRequestedUser());

            if (credit.isPresent()) {
                Date requestDate = credit.get().getRequestDate();
                long diff = new Date().getTime() - requestDate.getTime();
                if (diff < 2592000000L) {
                    request.setConfirmStatus(CreditRequestStatusEnum.Rejected);
                    request.setConfirmerComment("Müraciətçinin 30 gün gecikməsi olmamalıdır");
                    creditRequestRepository.save(request);
                    flag = true;
                    smsService.sendSMSOneToN(SendSmsRequest.builder()
                            .message(
                                    rejectMessage)
                            .numbers(List.of(request.getRequestedUser().getPhoneNumber()))
                            .build());
                    return request;
                }
            }
        }

        if (!flag) {
            request.setConfirmStatus(CreditRequestStatusEnum.Accepted);
            // muraciet tesdiqlendi sms
            smsService.sendSMSOneToN(SendSmsRequest.builder()
                    .message(
                            "Sizin kredit muracietiniz təsdiqləndi, mobil nömrə və şifrə vasitəsilə aşağıdakı linkdən hesabınıza daxil olub və krediti aktivləşdirin \n"
                                    + kabinetUrl)
                    .numbers(List.of(request.getRequestedUser().getPhoneNumber()))
                    .build());
            request = creditRequestRepository.save(request);
        }

        return request;
    }

    @Override
    public SimaQRResponse activate(String creditRequestId, String redirectUrl, Authentication authentication) {
        var user = userRepository.findFirstByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(creditRequestId)
                .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));
        if (creditRequest.getRequestedUser().getId().equals(user.getId())
                && creditRequest.getConfirmStatus() == CreditRequestStatusEnum.Accepted
                && creditRequest.getActivateStatus() == EActivateStatus.PENDING) {
            // sign with sima
            SimaQRResponse simaQRResponse = simaService.getAuthQR(creditRequest.getRequestedUser().getPin(),
                    redirectUrl,
                    ContractTypeEnum.Sign);

            creditRequest.setActivateStatus(EActivateStatus.ACTIVATED);
            creditRequest.setFinalStatus(EFinalStatus.ACCEPTED);
            creditRequestRepository.save(creditRequest);

            // create credit in sima
            creditRepository.save(toCredit(creditRequest, simaQRResponse.getOperationId()));

            // send sms to user
            smsService.sendSMSOneToN(SendSmsRequest.builder()
                    .message("Sizin adınıza İdeal BOKT-da " + creditRequest.getCreditAmount()
                            + " AZN kredit aktivləşdirildi, kredit məlumatları üçün " + kabinetUrl
                            + " saytına daxil olun")
                    .numbers(List.of(creditRequest.getRequestedUser().getPhoneNumber()))
                    .build());
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
        var user = userRepository.findFirstByUsername(authentication.getName())
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
    public Long count(Authentication auth) {
        User usr = userRepository.findFirstByUsername(auth.getName()).orElseThrow();
        return isAdmin(usr) ? creditRequestRepository.count() : creditRequestRepository.countByRequestedUser(usr);
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

    boolean isAdmin(User u) {
        return u.getRoles().stream().filter(f -> f.getName() == ERole.ROLE_ADMIN).count() > 0;
    }

    @Override
    public Page<CreditRequest> search(CreditRequestSearchDto search, Authentication auth) {
        User usr = userRepository.findFirstByUsername(auth.getName()).orElseThrow();
        Query q = new Query().skip(search.getPage() * search.getPageSize())
                .limit(search.getPageSize());
        if (search.getCreditType() != null && !search.getCreditType().isEmpty()) {
            q.addCriteria(Criteria.where("creditType").is(ECreditType.valueOf(search.getCreditType()).name()));
        }
        if (search.getConfirmStatus() != null && !search.getConfirmStatus().isEmpty()) {
            q.addCriteria(Criteria.where("confirmStatus")
                    .is(CreditRequestStatusEnum.valueOf(search.getConfirmStatus()).name()));
        }
        if (search.getSearch() != null && search.getSearch().trim().length() > 0) {
            if (isAdmin(usr)) {
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
            } else {
                q.addCriteria(Criteria
                        .where("requestedUser").is(usr)
                        .and("creditPurpose").regex(search.getSearch()));
            }
        } else {
            if (!isAdmin(usr)) {
                q.addCriteria(Criteria
                        .where("requestedUser").is(usr));
            }
        }

        List<CreditRequest> list = mongoTemplate.find(q.with(Sort.by(Sort.Order.desc("requestDate"))),
                CreditRequest.class);

        return PageableExecutionUtils.getPage(
                list,
                list.isEmpty() ? Pageable.unpaged() : Pageable.ofSize(list.size()).withPage(search.getPage()),
                () -> mongoTemplate.count(Query.of(q).limit(-1).skip(-1), CreditRequest.class));

    }

    @Override
    public Long countOf(ECreditType creditType, Authentication auth) {
        User usr = userRepository.findFirstByUsername(auth.getName()).orElseThrow();
        return isAdmin(usr) ? creditRequestRepository.countByCreditType(creditType)
                : creditRequestRepository.countByCreditTypeAndRequestedUser(creditType, usr);
    }

    @Override
    public CreditRequest acceptByAdmin(String creditRequestId, Authentication authentication) {
        var user = userRepository.findFirstByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(creditRequestId)
                .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));

        creditRequest.setConfirmStatus(CreditRequestStatusEnum.Accepted);
        creditRequest = creditRequestRepository.save(creditRequest);
        // send sms to user
        smsService.sendSMSOneToN(SendSmsRequest.builder()
                .numbers(List.of(creditRequest.getRequestedUser().getPhoneNumber()))
                .message("Sizin adınıza İdeal BOKT-da " + creditRequest.getCreditAmount()
                        + " AZN kredit təsdiq edildi, kredit məlumatları üçün " + kabinetUrl + " saytına daxil olun")
                .build());

        return creditRequest;
    }

    @Override
    public CreditRequest rejectByAdmin(String creditRequestId, Authentication authentication) {
        var user = userRepository.findFirstByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CreditRequest creditRequest = creditRequestRepository.findById(creditRequestId)
                .orElseThrow(() -> new RuntimeException("Credit request with this id does not exist"));

        creditRequest.setConfirmStatus(CreditRequestStatusEnum.Rejected);
        creditRequest.setActivateStatus(EActivateStatus.REJECTED);
        creditRequest.setFinalStatus(EFinalStatus.REJECTED);
        creditRequest = creditRequestRepository.save(creditRequest);
        // send sms to user
        smsService.sendSMSOneToN(SendSmsRequest.builder()
                .numbers(List.of(creditRequest.getRequestedUser().getPhoneNumber()))
                .message("Sizin adınıza İdeal BOKT-da " + creditRequest.getCreditAmount()
                        + " AZN kredit ləğv edildi, kredit məlumatları üçün " + kabinetUrl + " saytına daxil olun")
                .build());

        return creditRequest;
    }

    @Override
    public Long countOfConfirmStatus(CreditRequestStatusEnum confirmStatus, Authentication auth) {
        User usr = userRepository.findFirstByUsername(auth.getName()).orElseThrow();
        return isAdmin(usr) ? creditRequestRepository.countByConfirmStatus(confirmStatus)
                : creditRequestRepository.countByConfirmStatusAndRequestedUser(confirmStatus, usr);
    }

    @Override
    public Long countByCreditYear() {
        Date date = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return creditRequestRepository.countByCreditYear(c.get(Calendar.YEAR));
    }
}
