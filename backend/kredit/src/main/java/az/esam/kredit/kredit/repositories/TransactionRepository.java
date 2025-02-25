package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    Page<Transaction> findAllByOrderByCreatedDateDesc(Pageable pageable);

    Page<Transaction> findAllByUserIdOrderByCreatedDateDesc(String userId, Pageable pageable);
}
