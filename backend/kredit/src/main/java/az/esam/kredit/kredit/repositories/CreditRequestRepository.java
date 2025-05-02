package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.CreditRequestStatusEnum;
import az.esam.kredit.kredit.entities.enums.ECreditType;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreditRequestRepository extends MongoRepository<CreditRequest, String> {

    public long countByConfirmStatus(CreditRequestStatusEnum confirmStatus);

    public long countByCreditType(ECreditType creditType);

    public long countByRequestedUser(User requestedUser);

    public long countByCreditTypeAndRequestedUser(ECreditType creditType, User requestedUser);

    public long countByConfirmStatusAndRequestedUser(CreditRequestStatusEnum confirmStatus, User requestedUser);

    public Optional<CreditRequest> findOneByRequestedUserOrderByRequestDateDesc(User requestedUser);

    public long countByCreditYear(int creditYear);
}
