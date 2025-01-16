package az.esam.kredit.kredit.services.external.hms;

import az.esam.kredit.kredit.entities.BlacklistedIndividual;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class HMSGovServiceImpl implements HMSGovService {

    String urlString = "http://hms.gov.az/frq-content/nov_snk_v1/DOMESTIC.xml";

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<BlacklistedIndividual> fetchAndParseXML() throws Exception {
        List<BlacklistedIndividual> individuals = new ArrayList<>();

        // Fetch XML data from URL
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        try (InputStream inputStream = connection.getInputStream()) {
            // Parse XML
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(inputStream);
            document.getDocumentElement().normalize();

            // Get all INDIVIDUAL nodes
            NodeList nodeList = document.getElementsByTagName("INDIVIDUAL");

            for (int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);

                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    String dataId = getTagValue("DATAID", element);
                    String firstName = getTagValue("FIRST_NAME", element);
                    String secondName = getTagValue("SECOND_NAME", element);
                    String thirdName = getTagValue("THIRD_NAME", element);
                    String nameOriginalScript = getTagValue("NAME_ORIGINAL_SCRIPT", element);
                    String dateOfBirth = getTagValue("DATE", (Element) element.getElementsByTagName("INDIVIDUAL_DATE_OF_BIRTH").item(0));
                    String nameAz = "";
                    String surnameAz = "";
                    String patronymicAz = "";
                    if (nameOriginalScript != null) {
                        nameAz = nameOriginalScript.split(" ")[0];
                        surnameAz = nameOriginalScript.split(" ")[1];
                        patronymicAz = nameOriginalScript.split(" ")[2];
                    }

                    // check if individual already exists in DB with dataId, then skip
                    if (mongoTemplate.exists(Query.query(Criteria.where("dataId").is(dataId)), BlacklistedIndividual.class)) {
                        log.info("Blacklisted individual with dataId {} already exists in DB, skipping...", dataId);
                        continue;
                    }
                    BlacklistedIndividual individual = BlacklistedIndividual.builder()
                            .dataId(dataId)
                            .firstName(firstName)
                            .secondName(secondName)
                            .thirdName(thirdName)
                            .nameOriginalScript(nameOriginalScript)
                            .nameAz(nameAz)
                            .surnameAz(surnameAz)
                            .patronymicAz(patronymicAz)
                            .dateOfBirth(dateOfBirth)
                            .build();

                    mongoTemplate.save(individual);
                    log.info("Blacklisted individual saved: {}", individual);
                    individuals.add(individual);
                }
            }
        } catch (Exception e) {
            log.error("Error occurred while fetching and parsing XML data from URL: {}", urlString, e);
            throw e;
        }

        return individuals;

    }

    private static String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag);
        if (nodeList.getLength() > 0) {
            Node node = nodeList.item(0);
            if (node != null && node.getNodeType() == Node.ELEMENT_NODE) {
                return node.getTextContent();
            }
        }
        return null;
    }
}
