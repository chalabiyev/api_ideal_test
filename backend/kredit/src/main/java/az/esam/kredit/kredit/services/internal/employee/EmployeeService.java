package az.esam.kredit.kredit.services.internal.employee;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;

public interface EmployeeService {

    public EmployeeInfoResponse getEmployeeByPin(String pin);
}
