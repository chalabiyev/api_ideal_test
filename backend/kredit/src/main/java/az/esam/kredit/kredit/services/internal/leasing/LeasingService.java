package az.esam.kredit.kredit.services.internal.leasing;

import az.esam.kredit.kredit.entities.Leasing;

public interface LeasingService {
    String sendRequestToNextEmail(Leasing leasing);
}
