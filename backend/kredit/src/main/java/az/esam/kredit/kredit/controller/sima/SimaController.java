package az.esam.kredit.kredit.controller.sima;

import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.entities.sima.ContractStatusEnum;
import az.esam.kredit.kredit.entities.sima.SimaCallBack;
import az.esam.kredit.kredit.entities.sima.SimaCallBackResponse;
import az.esam.kredit.kredit.entities.sima.SimaGetFileResponse;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;
import az.esam.kredit.kredit.services.sima.SimaService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/sima")
public class SimaController {

    @Autowired
    SimaService simaService;

    @GetMapping("/getAuthQR")
    public ResponseEntity<SimaQRResponse> getAuthQR(
            HttpServletRequest httpRequest) {
        return ResponseEntity.ok(simaService.getAuthQR(null));
    }

    @GetMapping("/getAuthQRWithPin/{finCode}")
    public ResponseEntity<SimaQRResponse> getAuthQRWithPin(
            HttpServletRequest httpRequest,
            @PathVariable("finCode") String finCode) {
        return ResponseEntity.ok(simaService.getAuthQR(finCode));
    }

    @GetMapping("/getFile")
    public ResponseEntity<SimaGetFileResponse> getFile(
            HttpServletRequest httpRequest) {
        return ResponseEntity.ok(simaService.getFile(httpRequest));
    }

    @GetMapping("/getData")
    public ResponseEntity<SimaGetFileResponse> getData(
            HttpServletRequest httpRequest) {
        return ResponseEntity.ok(simaService.getData(httpRequest));
    }

    @PostMapping("/callBack")
    public ResponseEntity<SimaCallBackResponse> callBack(
            @RequestBody SimaCallBack callBack,
            HttpServletRequest httpRequest) {
        return ResponseEntity.ok(simaService.callBack(httpRequest, callBack));
    }

    @GetMapping("/getStatus/{operationId}")
    public ResponseEntity<ContractStatusEnum> getContractStatusByOperationId(
            HttpServletRequest httpRequest,
            @PathVariable("operationId") String operationId) {
        return ResponseEntity.ok(simaService.getContractStatusByOperationId(operationId));
    }

    @GetMapping("/getToken/{operationId}")
    public ResponseEntity<AuthenticationResponse> getTokenByOperationId(
            HttpServletRequest httpRequest,
            @PathVariable("operationId") String operationId) {
        return ResponseEntity.ok(simaService.getTokenByOperationId(httpRequest, operationId));
    }

}
