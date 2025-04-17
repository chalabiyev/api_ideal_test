package az.esam.kredit.kredit.services.sima;

import az.esam.kredit.kredit.dtos.requests.SimaTokenRequest;
import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.entities.sima.*;
import jakarta.servlet.http.HttpServletRequest;
import java.security.cert.X509Certificate;
import java.util.Date;

/**
 *
 * @author cihan
 */
public interface SimaService {

    public Date dateFromUtcTimestamp(long unix_time);

    public long dateToUtcTimestamp(Date date);

    public String base64Encode(String str);

    public String base64Decode(String str);

    public String sha256(String str);

    public SimaQRResponse getAuthQR(String finCode, String redirectUrl, ContractTypeEnum contractType);

    public SimaCallBackResponse callBack(HttpServletRequest request, SimaCallBack callBack);

    public SimaGetFileResponse getFile(HttpServletRequest request);

    public SimaGetFileResponse getData(HttpServletRequest request);

    public X509Certificate getCertificateFromB64String(String certB64);

    public SimaCertPersonInfo getPersonFromCertificate(String certB64);

    public String hmacSHA256(String key, String data) throws Exception;

    public boolean verifySign(String certB64, String dataB64, String signatureB64) throws Exception;

    public ContractStatusEnum getContractStatusByOperationId(String operationId);

    public AuthenticationResponse getToken(HttpServletRequest request, SimaTokenRequest simaTokenRequest);

    public SimaQRResponse getPdfQR(String fileName, String finCode, String redirectUrl);
}
