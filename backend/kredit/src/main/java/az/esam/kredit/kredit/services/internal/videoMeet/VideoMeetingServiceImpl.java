package az.esam.kredit.kredit.services.internal.videoMeet;

import az.esam.kredit.kredit.entities.VideoMeeting;
import az.esam.kredit.kredit.repositories.VideoMeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoMeetingServiceImpl implements VideoMeetingService {

    @Autowired
    VideoMeetingRepository videoMeetingRepository;

    @Override
    public Optional<VideoMeeting> findByMeetingId(String meetingID) {
        return videoMeetingRepository.findByMeetingId(meetingID);
    }

    @Override
    public Optional<VideoMeeting> findByVideoMeetingID(String videoMeetingID) {
        return videoMeetingRepository.findById(videoMeetingID);
    }

    @Override
    public Optional<VideoMeeting> findByClientId(String clientId) {
        return videoMeetingRepository.findByClientId(clientId);
    }

    @Override
    public Optional<VideoMeeting> findByOperatorId(String operatorId) {
        return videoMeetingRepository.findByOperatorId(operatorId);
    }

    @Override
    public Optional<VideoMeeting> findByNoterId(String noterId) {
        return videoMeetingRepository.findByNoterId(noterId);
    }

    @Override
    public VideoMeeting create(VideoMeeting videoMeeting) {
        return videoMeetingRepository.insert(videoMeeting);
    }

    @Override
    public VideoMeeting update(VideoMeeting videoMeeting) {
        return videoMeetingRepository.save(videoMeeting);
    }

    @Override
    public boolean delete(String videoMeetingID) {
        try {
            videoMeetingRepository.deleteById(videoMeetingID);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<VideoMeeting> findAll() {
        return videoMeetingRepository.findAll();
    }

    @Override
    public long count() {
        return videoMeetingRepository.count();
    }
}
