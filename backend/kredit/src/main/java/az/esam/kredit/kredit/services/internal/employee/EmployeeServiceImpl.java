package az.esam.kredit.kredit.services.internal.employee;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.repositories.asanfinance.AsanFinanceEmployeeInfoResponseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private AsanFinanceEmployeeInfoResponseRepository employeeRepository;

    @Override
    public EmployeeInfoResponse getEmployeeByPin(String pin) {
        return employeeRepository.findByPin(pin)
                .orElseThrow(() -> new RuntimeException("FIN kodlu işçi " + pin + " tapılmadı"));
    }

}
