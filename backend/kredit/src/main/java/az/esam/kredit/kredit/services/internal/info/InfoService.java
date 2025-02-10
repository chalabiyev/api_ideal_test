package az.esam.kredit.kredit.services.internal.info;

import az.esam.kredit.kredit.entities.content_management.Info;

import java.util.List;

public interface InfoService {

    Info add(Info info);

    Info update(Info info);

    Info get(String id);

    boolean delete(String id);

    List<Info> list();

    Long count();
}
