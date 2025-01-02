package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.Guarantor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GuarantorRepository extends MongoRepository<Guarantor, String> {

    

}
