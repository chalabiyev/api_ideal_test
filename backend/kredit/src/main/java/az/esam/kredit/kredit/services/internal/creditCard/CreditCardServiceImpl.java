package az.esam.kredit.kredit.services.internal.creditCard;

import az.esam.kredit.kredit.entities.CreditCard;
import az.esam.kredit.kredit.repositories.CreditCardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CreditCardServiceImpl implements CreditCardService {

    @Autowired
    CreditCardRepository creditCardRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public CreditCard add(CreditCard credit) {
        return creditCardRepository.save(credit);
    }

    @Override
    public CreditCard update(CreditCard credit) {
        return creditCardRepository.save(credit);
    }

    @Override
    public CreditCard get(String id) {
        return creditCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kredit kartı tapılmadı"));
    }

    @Override
    public boolean delete(String id) {
        try {
            CreditCard credit = creditCardRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Kredit kartı tapılmadı"));

            creditCardRepository.delete(credit);
            return true;
        } catch (Exception e) {
            log.error("Kredit kartı silinmədi {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<CreditCard> list() {
        return creditCardRepository.findAll();
    }

    @Override
    public Long count() {
        return creditCardRepository.count();
    }

    @Override
    public Page<CreditCard> getCards(String cardNumber, String cvv, String expiryDate, String serialNumber, int page, int size) {
        Criteria criteria = new Criteria();

        if (cardNumber != null) {
            // card number includes
            criteria.and("cardNumber").regex(cardNumber);
        }

        if (cvv != null) {
            criteria.and("cvv").regex(cvv);
        }

        if (expiryDate != null) {
            criteria.and("expiryDate").regex(expiryDate);
        }

        if (serialNumber != null) {
            criteria.and("serialNumber").regex(serialNumber);
        }

        Query query = new Query(criteria);

        // Pagination
        long total = mongoTemplate.count(query, CreditCard.class); // Total count for pagination
        query.skip((long) page * size).limit(size);

        // Fetch paginated results
        List<CreditCard> creditCards = mongoTemplate.find(query, CreditCard.class);

        return new PageImpl<>(creditCards, PageRequest.of(page, size), total);

    }
}
