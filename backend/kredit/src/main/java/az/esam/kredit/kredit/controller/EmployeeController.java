package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.services.internal.employee.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Endpoint to get employee information by PIN
    @GetMapping("/getByPin")
    public ResponseEntity<EmployeeInfoResponse> getEmployeeByPin(@RequestParam String pin) {
        EmployeeInfoResponse employeeInfo = employeeService.getEmployeeByPin(pin);
        return ResponseEntity.ok(employeeInfo);
    }

}
