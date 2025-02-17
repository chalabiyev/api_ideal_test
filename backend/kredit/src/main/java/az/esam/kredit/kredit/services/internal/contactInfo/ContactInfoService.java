package az.esam.kredit.kredit.services.internal.contactInfo;

import az.esam.kredit.kredit.entities.content_management.ContactInfo;

import java.util.List;

public interface ContactInfoService {

    ContactInfo add(ContactInfo contactInfo);

    ContactInfo update(ContactInfo contactInfo);

    boolean delete(String id);

    List<ContactInfo> list();

    ContactInfo get(String id);

    long count();
}
