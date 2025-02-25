package az.esam.kredit.kredit.services.internal.transaction;

import az.esam.kredit.kredit.entities.Transaction;
import az.esam.kredit.kredit.repositories.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Page<Transaction> list(Pageable pageable) {
        return transactionRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    @Override
    public Page<Transaction> listByUser(String userId, Pageable pageable) {
        return transactionRepository.findAllByUserIdOrderByCreatedDateDesc(userId, pageable);
    }
}
