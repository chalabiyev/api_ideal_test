package az.esam.kredit.kredit.services.excel;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import az.esam.kredit.kredit.dtos.responses.asanfinance.employee.EmployeeInfoResponse;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
import az.esam.kredit.kredit.entities.CreditRequest;
import az.esam.kredit.kredit.services.external.asanfinance.AsanFinanceService;
import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ExcelParseService {

        private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd.MM.yyyy");

        @Autowired
        AsanFinanceService asanFinanceService;

        @Autowired
        DocumentInfoService documentInfoService;

        public boolean parseExcel(Path outputPath, CreditRequest request) throws Exception {
                try {

                        InputStream inputStream = ExcelParseService.class.getResourceAsStream("/templates/input.xlsx");
                        if (inputStream == null) {
                                log.error("input.xlsx not found");
                                return false;
                        }
                        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
                        if (workbook == null) {
                                log.error("workbook is null");
                                return false;
                        }
                        XSSFSheet dataSheet = workbook.getSheetAt(0);
                        if (dataSheet == null) {
                                log.error("dataSheet is null");
                                return false;
                        }
                        FullIDCardInfoResponse idCardInfoResponse = null;
                        if (request.getRequestedUser().getSeriaNo() != null
                                        && request.getRequestedUser().getPin() != null) {
                                idCardInfoResponse = documentInfoService
                                                .getIdCardInfo(request.getRequestedUser().getSeriaNo(),
                                                                request.getRequestedUser().getPin());
                        } else if (request.getRequestedUser().getPin() != null) {
                                idCardInfoResponse = documentInfoService
                                                .getIdCardInfoByPin(request.getRequestedUser().getPin());
                        }

                        if (idCardInfoResponse == null) {
                                log.error("idCardInfoResponse is null");
                                return false;
                        }

                        log.info("Excel Parser started!!!");
                        CellReference cr = new CellReference("E5");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(DATE_FORMAT.format(request.getRequestDate()));
                        cr = new CellReference("F5");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(DATE_FORMAT.format(request.getRequestDate()));
                        cr = new CellReference("I5");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(String.format("%05d", request.getCreditOrderNo()) + "/"
                                                        + request.getCreditYear());
                        cr = new CellReference("C21");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getSeriaNo());
                        cr = new CellReference("E21");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(idCardInfoResponse.getEventDate() == null ? ""
                                                        : DATE_FORMAT.format(idCardInfoResponse.getEventDate()));
                        cr = new CellReference("F21");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getPin());
                        cr = new CellReference("C23");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getFullName());
                        cr = new CellReference("C27");// Kim tərəfindən verilib bu data yok
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol()).setCellValue("");
                        cr = new CellReference("C29");// Qeydiyyat ünvanı
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getAddress());
                        cr = new CellReference("C31");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getActualAddress() == null ? ""
                                                        : request.getActualAddress());
                        cr = new CellReference("C33");
                        String phoneNumber = request.getPhoneNumber() + " müştəri, ";
                        if (request.getRelatedPersons() != null && !request.getRelatedPersons().isEmpty()) {
                                for (var relatedPerson : request.getRelatedPersons()) {
                                        phoneNumber += relatedPerson.getPhone() + " " + relatedPerson.getRelation()
                                                        + ",";
                                }
                        }
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol()).setCellValue(phoneNumber);
                        cr = new CellReference("D35");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getBirthAddress());
                        cr = new CellReference("E35");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(DATE_FORMAT.format(request.getRequestedUser().getBirthDate()));
                        cr = new CellReference("C37");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getNationality());
                        cr = new CellReference("C39");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getRequestedUser().getMaritalStatus() == "MARRIED"
                                                        ? "Evli"
                                                        : "Subay");
                        cr = new CellReference("C41");// Təhsili data yok
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("Orta");
                        EmployeeInfoResponse employeeInfoResponse = asanFinanceService
                                        .getEmployeeInfoByPin(request.getRequestedUser().getPin(), false);
                        if (employeeInfoResponse == null) {
                                employeeInfoResponse = asanFinanceService
                                                .getEmployeeInfoByPin(request.getRequestedUser().getPin(), true);
                        }
                        String workplaceName = "Fərdi gəlirlər";
                        String workplaceAddress = "Bakı";
                        String workTitle = "";
                        Double salary = 0d;
                        if (employeeInfoResponse != null && employeeInfoResponse.getActive() != null
                                        && !employeeInfoResponse.getActive().isEmpty()) {
                                workplaceName = employeeInfoResponse.getActive().get(0).getEmployer().getName();
                                workplaceAddress = employeeInfoResponse.getActive().get(0).getEmployer()
                                                .getLegalAddress();
                                workTitle = employeeInfoResponse.getActive().get(0).getEmployee()
                                                .getPositionLabourContract();
                                // format as a number with two decimal places
                                salary = employeeInfoResponse.getActive().get(0).getEmployee().getSalary();
                        } else if (request.getAdditionalIncomes() != null
                                        && request.getAdditionalIncomes().size() > 0) {
                                workplaceName = request.getAdditionalIncomes().get(0).getSource();
                                if (request.getAdditionalIncomes().get(0).getAmount() != null) {
                                        try {
                                                salary = Double.parseDouble(
                                                                request.getAdditionalIncomes().get(0).getAmount()
                                                                                .replaceAll(".", "")
                                                                                .replaceAll(",", "."));
                                        } catch (Exception e) {
                                        }
                                }
                        }
                        cr = new CellReference("C43"); // İşlədiyi yerin hüquqi adı
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(workplaceName);
                        cr = new CellReference("C45");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(workplaceAddress);
                        cr = new CellReference("C47");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(workTitle);
                        cr = new CellReference("C49");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(salary);
                        cr = new CellReference("C53");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("0");
                        cr = new CellReference("C55");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("0");
                        cr = new CellReference("C57");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("0");
                        cr = new CellReference("C59");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("0");
                        cr = new CellReference("C61");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("Yox");
                        cr = new CellReference("D63");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("Fiziki şəxs");
                        cr = new CellReference("D65");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue("Əmək haqqı");
                        cr = new CellReference("C68");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getOperationType().equals("product")
                                                        ? "İstehlak mal(lar)ının alınması üçün"
                                                        : "Xidmətlərin alınması üçün");
                        cr = new CellReference("C74");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getCreditDetails().getCreditAmount());
                        cr = new CellReference("C78");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getCreditDetails().getCreditTerm());
                        cr = new CellReference("C84");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getCreditDetails().getCashPrice());
                        cr = new CellReference("C90");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getOperationType().equals("product")
                                                        ? "Daşınar əmlak-İstehlak malları"
                                                        : "");
                        cr = new CellReference("C92");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getCreditDetails().getProductName());
                        cr = new CellReference("C94");
                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                        .setCellValue(request.getPartner() != null
                                                        ? request.getPartner().getDirectorName()
                                                        : "");
                        if (request.getGuarantors() != null && request.getGuarantors().size() > 0) {
                                cr = new CellReference("C102");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getGuarantors().get(0).getDocumentNumber());
                                cr = new CellReference("E102");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getGuarantors().get(0).getEventDate() == null ? ""
                                                                : DATE_FORMAT.format(
                                                                                request.getGuarantors().get(0)
                                                                                                .getEventDate()));
                                cr = new CellReference("C106");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getGuarantors().get(0).getPersonAz().getName()
                                                                + " "
                                                                + request.getGuarantors().get(0).getPersonAz()
                                                                                .getSurname()
                                                                + " "
                                                                + request.getGuarantors().get(0).getPersonAz()
                                                                                .getPatronymic());
                                cr = new CellReference("C108");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getRequestedUser().getFullName());
                                cr = new CellReference("C110");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getGuarantors().get(0).getAddressDetail()
                                                                .getAddress());
                                cr = new CellReference("C112");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getGuarantors().get(0).getAddressDetail()
                                                                .getAddress());
                                cr = new CellReference("C114");
                                dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                .setCellValue(request.getGuarantors().get(0).getPhoneNumber());

                                if (request.getGuarantors().size() > 1) {
                                        cr = new CellReference("C120");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request.getGuarantors().get(1)
                                                                        .getDocumentNumber());
                                        cr = new CellReference("E120");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request
                                                                        .getGuarantors().get(1).getEventDate() == null
                                                                                        ? ""
                                                                                        : DATE_FORMAT.format(request
                                                                                                        .getGuarantors()
                                                                                                        .get(1)
                                                                                                        .getEventDate()));
                                        cr = new CellReference("C124");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request.getGuarantors().get(1).getPersonAz()
                                                                        .getName()
                                                                        + " "
                                                                        + request.getGuarantors().get(1).getPersonAz()
                                                                                        .getSurname()
                                                                        + " "
                                                                        + request.getGuarantors().get(1).getPersonAz()
                                                                                        .getPatronymic());
                                        cr = new CellReference("C126");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request.getRequestedUser().getFullName());
                                        cr = new CellReference("C128");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request.getGuarantors().get(1).getAddressDetail()
                                                                        .getAddress());
                                        cr = new CellReference("C130");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request.getGuarantors().get(1).getAddressDetail()
                                                                        .getAddress());
                                        cr = new CellReference("C132");
                                        dataSheet.getRow(cr.getRow()).getCell(cr.getCol())
                                                        .setCellValue(request.getGuarantors().get(1).getPhoneNumber());
                                }
                        }
                        workbook.setForceFormulaRecalculation(true);

                        for (int i = 0; i < 10; i++) {
                                XSSFSheet sheet = workbook.getSheetAt(i);
                                sheet.setForceFormulaRecalculation(true);
                        }

                        XSSFFormulaEvaluator.evaluateAllFormulaCells(workbook);

                        XSSFSheet ppSheet = workbook.getSheetAt(2);
                        Date dt = request.getRequestDate();
                        Calendar c = Calendar.getInstance();
                        c.setTime(dt);
                        for (int i = 0; i < request.getCreditTerm(); i++) {
                                c.add(Calendar.MONTH, 1);
                                XSSFCell cell = ppSheet.getRow(17 + i).getCell(2);
                                cell.setCellType(CellType.STRING);
                                cell.setCellValue(DATE_FORMAT.format(c.getTime()));
                        }

                        workbook.write(new FileOutputStream(outputPath.toFile()));
                        workbook.close();
                        log.info("Excel Parser finished!!! Output Path: " + outputPath);
                        return true;
                } catch (Exception e) {
                        e.printStackTrace();
                        log.error("Excel Parser error: " + e.getMessage());
                        for (var stack : e.getStackTrace()) {
                                log.error(stack.getClassName() + " " + stack.getMethodName() + " "
                                                + stack.getLineNumber());
                        }
                        return false;
                }
        }

}
