package az.esam.kredit.kredit.services.external.hms;

import az.esam.kredit.kredit.entities.BlacklistedIndividual;

import java.util.List;

public interface HMSGovService {
    List<BlacklistedIndividual> fetchAndParseXML() throws Exception;
}

