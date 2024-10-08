package az.esam.kredit.kredit.repositories;

import az.esam.kredit.kredit.entities.VideoMeeting;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VideoMeetingRepository extends MongoRepository<VideoMeeting, String> {

    Optional<VideoMeeting> findByMeetingId(String meetingId);

    Optional<VideoMeeting> findByClientId(String clientId);

    Optional<VideoMeeting> findByOperatorId(String operatorId);

    Optional<VideoMeeting> findByNoterId(String noterId);

}
