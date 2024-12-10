package az.esam.kredit.kredit.services.internal.insurance;

import az.esam.kredit.kredit.entities.Insurance;

import java.util.List;

public interface InsuranceService {
    Insurance add(Insurance insurance);

    Insurance update(Insurance insurance);

    Insurance get(String id);

    boolean delete(String id);

    List<List<Insurance>> list();

    List<Insurance> listAll();

    Long count();
}
