package az.esam.kredit.kredit.scheduledjobs;


import az.esam.kredit.kredit.services.external.hms.HMSGovService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
@Slf4j
public class ImportBlackListedIndividuals {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    HMSGovService hmsGovService;

    // Run every month on 10th day at 00:00
//    @Scheduled(cron = "0 0 0 10 * ?")
    @Scheduled(fixedRate = 43200000) // 12 hours in milliseconds
    public void importBlackListedIndividuals() {
        log.info("Importing blacklisted individuals from HMS Gov service...");
        try {
            hmsGovService.fetchAndParseXML();
        } catch (Exception e) {
            log.error("Error in importBlackListedIndividuals: {}", e.getMessage());
        }
        log.info("Importing blacklisted individuals from HMS Gov service completed.");
    }



}
