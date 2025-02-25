package az.esam.kredit.kredit.services.internal.slider;

import az.esam.kredit.kredit.entities.content_management.Slider;

import java.util.List;

public interface SliderService {
    
    Slider add(Slider slider);

    Slider update(Slider slider);

    Slider get(String id);

    boolean delete(String id);

    List<Slider> list();

    Long count();
}

