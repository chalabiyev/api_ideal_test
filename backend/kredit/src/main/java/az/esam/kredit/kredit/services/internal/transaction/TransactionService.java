package az.esam.kredit.kredit.services.internal.transaction;

import az.esam.kredit.kredit.entities.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransactionService {
    Page<Transaction> list(Pageable pageable);
    Page<Transaction> listByUser(String userId, Pageable pageable);
}
