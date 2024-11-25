package az.esam.kredit.kredit.services.internal.videoMeet;

import az.esam.kredit.kredit.entities.VideoMeeting;

import java.util.List;
import java.util.Optional;

public interface VideoMeetingService {

    Optional<VideoMeeting> findByMeetingId(String meetingId);

    Optional<VideoMeeting> findByVideoMeetingID(String videoMeetingID);

    Optional<VideoMeeting> findByClientId(String clientId);

    Optional<VideoMeeting> findByOperatorId(String operatorId);

    Optional<VideoMeeting> findByNoterId(String noterId);

    VideoMeeting create(VideoMeeting videoMeeting);

    VideoMeeting update(VideoMeeting videoMeeting);

    boolean delete(String videoMeetingID);

    List<VideoMeeting> findAll();

    long count();
}
