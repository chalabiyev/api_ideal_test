package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.UploadedFile;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UploadedFileRepository extends MongoRepository<UploadedFile, String> {
    
    public Optional<UploadedFile> findByFileName(String fileName);
}
