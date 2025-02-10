package az.esam.kredit.kredit.repositories.content_management;

import az.esam.kredit.kredit.entities.content_management.Slider;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SliderRepository extends MongoRepository<Slider, String> {
}
