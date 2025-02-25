package az.esam.kredit.kredit.services.internal.about;

import az.esam.kredit.kredit.entities.content_management.AboutUs;

import java.util.List;

public interface AboutUsService {

    AboutUs add(AboutUs aboutUs);

    AboutUs update(AboutUs aboutUs);

    AboutUs get(String id);

    boolean delete(String id);

    List<AboutUs> list();

    Long count();
}