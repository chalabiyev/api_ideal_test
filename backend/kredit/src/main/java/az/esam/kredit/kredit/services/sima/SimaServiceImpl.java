package az.esam.kredit.kredit.services.sima;

import az.esam.kredit.kredit.dtos.requests.SimaTokenRequest;
import az.esam.kredit.kredit.dtos.responses.AuthenticationResponse;
import az.esam.kredit.kredit.dtos.responses.document.FullIDCardInfoResponse;
import az.esam.kredit.kredit.entities.enums.EPlatform;
import az.esam.kredit.kredit.entities.sima.ClientInfo;
import az.esam.kredit.kredit.entities.sima.ContractStatusEnum;
import az.esam.kredit.kredit.entities.sima.ContractTypeEnum;
import az.esam.kredit.kredit.entities.sima.DataInfo;
import az.esam.kredit.kredit.entities.sima.Header;
import az.esam.kredit.kredit.entities.sima.OperationInfo;
import az.esam.kredit.kredit.entities.sima.ProtoInfo;
import az.esam.kredit.kredit.entities.sima.SignableContainer;
import az.esam.kredit.kredit.entities.sima.SimaCallBack;
import az.esam.kredit.kredit.entities.sima.SimaCallBackResponse;
import az.esam.kredit.kredit.entities.sima.SimaCertPersonInfo;
import az.esam.kredit.kredit.entities.sima.SimaContract;
import az.esam.kredit.kredit.entities.sima.SimaEncodedContract;
import az.esam.kredit.kredit.entities.sima.SimaGetFileResponse;
import az.esam.kredit.kredit.entities.sima.SimaQRResponse;

import static az.esam.kredit.kredit.helper.Helper.getClientIpAddress;

import az.esam.kredit.kredit.repositories.sima.SimaEncodedContractRepository;
import az.esam.kredit.kredit.security.auth.AuthenticationService;
import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import az.esam.kredit.kredit.services.internal.otp.OTPService;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.servlet.http.HttpServletRequest;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Signature;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.imageio.ImageIO;
import javax.security.auth.x500.X500Principal;

import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

/**
 * @author cihan
 */
@Service
@Slf4j
public class SimaServiceImpl implements SimaService {

    @Value("${sima.baseUrl}")
    private String baseUrl;
    @Value("${sima.clientId}")
    private long clientId;
    @Value("${sima.masterKey}")
    private String masterKey;
    @Value("${sima.clientName}")
    private String clientName;
    @Value("${sima.iconUri}")
    private String iconUri;
    @Value("${sima.callBackUri}")
    private String callBackUri;
    @Value("${sima.redirectUri}")
    private String redirectUri;
    @Value("${sima.getFileUri}")
    private String getFileUri;
    @Value("${sima.getDataUri}")
    private String getDataUri;

    @Autowired
    ObjectMapper om;

    @Autowired
    SimaEncodedContractRepository simaEncodedContractRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    OTPService oTPService;

    @Autowired
    DocumentInfoService documentInfoService;

    @Autowired
    StorageService storageService;

    final Charset charSet = Charset.forName("ISO-8859-9");

    @Override
    public Date dateFromUtcTimestamp(long unix_time) {
        Date date = new Date();
        date.setTime((long) unix_time * 1000);
        return date;
    }

    @Override
    public long dateToUtcTimestamp(Date date) {
        return date.getTime() / 1000;
    }

    private Date truncateDate(Date date) {
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTime();
    }

    @Override
    public SimaQRResponse getAuthQR(String finCode, String redirectUrl, ContractTypeEnum contractType) {

        // try {
        // String hmactest = hmacSHA256(masterKey,
        // "{\"ProtoInfo\":{\"Name\":\"web2app\",\"Version\":\"1.3\"},\"OperationInfo\":{\"Type\":\"Auth\",\"OperationId\":\"7b173770-57bb-4405-9ded-038fc9fc1f36\",\"NbfUTC\":1733356800,\"ExpUTC\":1733443200,\"Assignee\":[]},\"DataInfo\":{\"DataURI\":\"https://api.studentall.az:9899/api/sima/getData?operationId=7b173770-57bb-4405-9ded-038fc9fc1f36\",\"AlgName\":null,\"FingerPrint\":null},\"ClientInfo\":{\"ClientId\":3144201,\"IconURI\":\"https://ideal-kredit-copy.vercel.app/HeaderLogo.png\",\"Callback\":\"https://api.studentall.az:9899/api/sima/callBack\",\"ClientName\":\"Ideal
        // Kredit\",\"RedirectURI\":\"https://localhost:8080/simalogin\",\"HostName\":null}}");
        // hmactest = base64Encode(hmactest);
        // } catch (Exception ex) {
        // Logger.getLogger(SimaServiceImpl.class.getName()).log(Level.SEVERE, null,
        // ex);
        // }
        // ProtoInfo protoInfoTest =
        // ProtoInfo.builder().Name("web2app").Version("1.3").build();
        // OperationInfo operationInfoTest = OperationInfo.builder()
        // .Type(ContractTypeEnum.Auth)
        // .OperationId("7b173770-57bb-4405-9ded-038fc9fc1f36")
        // .NbfUTC(1733356800)
        // .ExpUTC(1733443200)
        // .Assignee(new ArrayList())
        // .build();
        // ClientInfo clientInfoTest = ClientInfo.builder()
        // .ClientId(3144201)
        // .ClientName("Ideal Kredit")
        // .IconURI("https://ideal-kredit-copy.vercel.app/HeaderLogo.png")
        // .Callback("https://api.studentall.az:9899/api/sima/callBack")
        // .RedirectURI("https://localhost:8080/simalogin")
        // .build();
        // SignableContainer signableContainerTest = SignableContainer.builder()
        // .ProtoInfo(protoInfoTest)
        // .OperationInfo(operationInfoTest)
        // .ClientInfo(clientInfoTest)
        // .DataInfo(DataInfo.builder()
        // .DataURI("https://api.studentall.az:9899/api/sima/getData?operationId=7b173770-57bb-4405-9ded-038fc9fc1f36").build())
        // .build();
        //
        // String signableContainerStrTest;
        // try {
        // signableContainerStrTest =
        // om.writeValueAsString(signableContainerTest).trim();
        //// String chTest = sha256(signableContainerStrTest);
        // String sTest = hmacSHA256(masterKey, signableContainerStrTest);
        // Header header = Header.builder()
        // .AlgName("HMACSHA256")
        // .Signature(base64Encode(sTest))
        // .build();
        // SimaContract simaContractTest = SimaContract.builder()
        // .SignableContainer(signableContainerTest)
        // .Header(header)
        // .build();
        // String simaContractStrTest = om.writeValueAsString(simaContractTest);
        // String encodedContractTest = base64Encode(simaContractStrTest);
        // String qrStrTest = getFileUri.concat(encodedContractTest);
        // log.info(qrStrTest);
        // } catch (JsonProcessingException ex) {
        //
        // } catch (Exception ex) {
        //
        // }
        String result = "";
        String qrStr = "";
        Calendar c = Calendar.getInstance();
        Date now = new Date();
        c.setTime(now);
        c.add(Calendar.DATE, 1);
        Date end = c.getTime();
        ProtoInfo protoInfo = ProtoInfo.builder().Name("web2app").Version("1.3").build();
        String operationId = UUID.randomUUID().toString();
        OperationInfo operationInfo = OperationInfo.builder()
                .Type(contractType) // send type with request
                .OperationId(operationId)
                .NbfUTC(dateToUtcTimestamp(truncateDate(now)))
                .ExpUTC(dateToUtcTimestamp(truncateDate(end)))
                .Assignee(finCode == null ? new ArrayList() : Arrays.asList(finCode))
                .build();
        ClientInfo clientInfo = ClientInfo.builder()
                .ClientId(clientId)
                .ClientName(clientName)
                .IconURI(iconUri)
                .Callback(callBackUri)
                .RedirectURI(redirectUrl)
                .build();
        SignableContainer signableContainer = SignableContainer.builder()
                .ProtoInfo(protoInfo)
                .OperationInfo(operationInfo)
                .ClientInfo(clientInfo)
                .DataInfo(DataInfo.builder()
                        .DataURI(getDataUri.concat("?operationId=").concat(operationId)).build())
                .build();
        try {
            String signableContainerStr = om.writeValueAsString(signableContainer).trim();
            String s = hmacSHA256(masterKey, signableContainerStr);
            Header header = Header.builder()
                    .AlgName("HMACSHA256")
                    .Signature(base64Encode(s))
                    .build();
            SimaContract simaContract = SimaContract.builder()
                    .SignableContainer(signableContainer)
                    .Header(header)
                    .build();
            String simaContractStr = om.writeValueAsString(simaContract).trim();
            log.info("sima simaContractStr : {}", simaContractStr);
            String encodedContract = base64Encode(simaContractStr);
            qrStr = getFileUri.concat(encodedContract);
            BufferedImage qrImage = generateQRCodeImage(qrStr);
            result = imgToBase64String(qrImage, "png");
            SimaEncodedContract simaEncodedContract = SimaEncodedContract.builder()
                    .encodedContract(encodedContract)
                    .simaContract(simaContract)
                    .operationId(operationId)
                    .createDate(now)
                    .expDate(end)
                    .status(ContractStatusEnum.created)
                    .build();
            simaEncodedContractRepository.insert(simaEncodedContract);
        } catch (JsonProcessingException ex) {
            log.error("Error", ex);
        } catch (Exception ex) {
            log.error("Error", ex);
        }
        return SimaQRResponse.builder()
                .image(result)
                .operationId(operationId)
                .tsQueryUrl(qrStr)
                .build();
    }

    @Override
    public SimaCallBackResponse callBack(HttpServletRequest request, SimaCallBack callBack) {
        SimaCallBackResponse result = SimaCallBackResponse.builder()
                .status("failed").build();
        log.info("sima callBack {}", callBack);
        String tsCert = request.getHeader("ts-cert");
        String tsSign = request.getHeader("ts-sign");
        log.info("sima callBack tsCert : {}", tsCert);
        // log.info("sima callBack dataSignature : {}", callBack.getDataSignature());
        SimaCertPersonInfo person = getPersonFromCertificate(tsCert);
        if (person != null) {
            log.info("sima callBack certificate person : {}", person);
            Optional<SimaEncodedContract> findContract = simaEncodedContractRepository
                    .findByOperationId(callBack.getOperationId());
            if (findContract.isPresent()) {
                SimaEncodedContract contract = findContract.get();
                log.info("sima callBack contract : {}", contract);
                if (contract.getExpDate().after(new Date())) {
                    result.setStatus("success");
                    contract.setSignDate(new Date());
                    contract.setSignedHash(callBack.getSignedDataHash());
                    contract.setDataSignature(callBack.getDataSignature());
                    contract.setSignerCert(tsCert);
                    contract.setSignerIP(getClientIpAddress(request));
                    contract.setStatus(ContractStatusEnum.succesed);
                    contract.setSignerFin(person.getFinCode());
                    if (contract.getSimaContract().getSignableContainer().getOperationInfo()
                            .getType() == ContractTypeEnum.Sign) {
                        if (contract.getFileName() != null) {
                            byte[] bytes = Base64.getDecoder().decode(contract.getDataSignature());
                            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
                            storageService.store(inputStream, contract.getFileName());
                        }
                    }
                } else {
                    contract.setStatus(ContractStatusEnum.failed);
                }
                simaEncodedContractRepository.save(contract);

                // try {
                // String dataB64 = base64Encode(callBack.getOperationId());
                // boolean verifyWithTsSign = verifySign(tsCert, dataB64, tsSign);
                // log.info("verifyWithTsSign : {}", verifyWithTsSign);
                // } catch (Exception e) {
                // log.error("Sign verifyWithTsSign verify error", e);
                // }
                //
                // try {
                // String dataB64 = base64Encode(callBack.getOperationId());
                // boolean verifyWithCallbackDS = verifySign(tsCert, dataB64,
                // callBack.getDataSignature());
                // log.info("verifyWithCallbackDS : {}", verifyWithCallbackDS);
                // } catch (Exception e) {
                // log.error("Sign verifyWithCallbackDS verify error", e);
                // }
            }
        }
        return result;
    }

    @Override
    public String base64Encode(String str) {
        return Base64.getEncoder().encodeToString(str.getBytes(charSet));
    }

    @Override
    public String base64Decode(String str) {
        return new String(Base64.getDecoder().decode(str), charSet);
    }

    @Override
    public String sha256(String str) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(
                    str.getBytes(charSet));

            StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
            for (int i = 0; i < encodedhash.length; i++) {
                String hex = Integer.toHexString(0xff & encodedhash[i]);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException ex) {
            log.error("Error", ex);
        }
        return null;
    }

    @Override
    public String hmacSHA256(String key, String data) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(data.getBytes(charSet));
        byte[] fileHash = md.digest();

        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key.getBytes(charSet), "HmacSHA256"));
        byte[] signature = mac.doFinal(fileHash);
        String hash = new String(signature, charSet);
        return hash;
    }

    public BufferedImage generateQRCodeImage(String barcodeText) throws Exception {
        QRCodeWriter barcodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = barcodeWriter.encode(barcodeText, BarcodeFormat.QR_CODE, 350, 350);
        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

    public String imgToBase64String(final RenderedImage img, final String formatName) {
        final ByteArrayOutputStream os = new ByteArrayOutputStream();
        try {
            ImageIO.write(img, formatName, os);
            return Base64.getEncoder().encodeToString(os.toByteArray());
        } catch (final IOException ioe) {
            throw new UncheckedIOException(ioe);
        }
    }

    public BufferedImage base64StringToImg(final String base64String) {
        try {
            return ImageIO.read(new ByteArrayInputStream(Base64.getDecoder().decode(base64String)));
        } catch (final IOException ioe) {
            throw new UncheckedIOException(ioe);
        }
    }

    @Override
    public SimaGetFileResponse getFile(HttpServletRequest request) {
        log.info("sima getFile request : {}", request);
        String tsCert = request.getHeader("ts-cert");
        log.info("sima getFile tsCert : {}", tsCert);
        X509Certificate certificate = getCertificateFromB64String(tsCert);
        if (certificate != null) {
            log.info("sima getFile certificate subject : {}", certificate.getSubjectX500Principal().getName());
        }
        SimaGetFileResponse result = null;
        String tsQuery = request.getParameter("tsquery");
        if (tsQuery != null) {
            Optional<SimaEncodedContract> optSimaContract = simaEncodedContractRepository
                    .findByEncodedContract(tsQuery);
            if (optSimaContract.isPresent()) {
                SimaEncodedContract simaEncodedContract = optSimaContract.get();
                if (simaEncodedContract.getSimaContract().getSignableContainer().getOperationInfo()
                        .getType() == ContractTypeEnum.Auth) {
                    result = SimaGetFileResponse.builder()
                            .filename("challenge")
                            .data(base64Encode(simaEncodedContract.getSimaContract().getSignableContainer()
                                    .getOperationInfo().getOperationId()))
                            .build();
                }
            }
        }
        return result;
    }

    @Override
    public X509Certificate getCertificateFromB64String(String certB64) {
        try {
            byte encodedCert[] = Base64.getDecoder().decode(certB64);
            ByteArrayInputStream inputStream = new ByteArrayInputStream(encodedCert);
            CertificateFactory certFactory = CertificateFactory.getInstance("X.509");
            X509Certificate cert = (X509Certificate) certFactory.generateCertificate(inputStream);
            return cert;
        } catch (CertificateException ex) {
            log.error("Error", ex);
            return null;
        }
    }

    @Override
    public SimaCertPersonInfo getPersonFromCertificate(String certB64) {
        SimaCertPersonInfo result = SimaCertPersonInfo.builder().build();
        X509Certificate cert = getCertificateFromB64String(certB64);
        X500Principal p = cert.getSubjectX500Principal();
        String subject = p.toString();
        String[] values = subject.split(",");
        for (String value : values) {
            String[] kValues = value.split("=");
            if (kValues != null && kValues.length == 2) {
                String key = kValues[0].trim();
                String kvalue = kValues[1].trim();
                switch (key) {
                    case "SERIALNUMBER":
                        result.setFinCode(kvalue);
                        break;
                    case "GIVENNAME":
                        result.setName(kvalue);
                        break;
                    case "SURNAME":
                        result.setSurName(kvalue);
                        break;
                    case "CN":
                        result.setFullName(kvalue);
                        String[] cns = kvalue.split(" ");
                        if (cns.length == 4) {
                            result.setFatherName(cns[2]);
                        }
                        break;
                    case "OU":
                        result.setVoen(kvalue.replaceAll("TIN:", ""));
                        break;
                    case "O":
                        result.setOrganisation(kvalue);
                        break;
                    case "T":
                        result.setTitle(kvalue);
                        break;
                }
            }
        }

        return result;
    }

    @Override
    public boolean verifySign(String certB64, String dataB64, String signatureB64) throws Exception {
        String SIMA_SIGNATURE_ALGORITHM = "SHA256withECDSA";
        Signature s = Signature.getInstance(SIMA_SIGNATURE_ALGORITHM);
        s.initVerify(getCertificateFromB64String(certB64));
        String data = base64Decode(dataB64);
        s.update(data.getBytes(StandardCharsets.UTF_8));
        String signature = base64Decode(signatureB64);
        return s.verify(signature.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public SimaGetFileResponse getData(HttpServletRequest request) {
        log.info("sima getData request : {}", request);
        String tsCert = request.getHeader("ts-cert");
        log.info("sima getData tsCert : {}", tsCert);
        X509Certificate certificate = getCertificateFromB64String(tsCert);
        if (certificate != null) {
            log.info("sima getData certificate subject : {}", certificate.getSubjectX500Principal().getName());
        }
        SimaGetFileResponse result = null;
        String operationId = request.getParameter("operationId");
        String fileName = request.getParameter("fileName");
        if (operationId != null) {
            Optional<SimaEncodedContract> optSimaContract = simaEncodedContractRepository
                    .findByOperationId(operationId);
            if (optSimaContract.isPresent()) {
                SimaEncodedContract simaEncodedContract = optSimaContract.get();
                try {
                    if (simaEncodedContract.getSimaContract().getSignableContainer().getOperationInfo()
                            .getType() == ContractTypeEnum.Auth) {
                        result = SimaGetFileResponse.builder()
                                .filename("challenge")
                                .data(base64Encode(simaEncodedContract.getSimaContract().getSignableContainer()
                                        .getOperationInfo().getOperationId()))
                                .build();
                        simaEncodedContract.setStatus(ContractStatusEnum.signing);
                        simaEncodedContractRepository.save(simaEncodedContract);
                    } else if (simaEncodedContract.getSimaContract().getSignableContainer().getOperationInfo()
                            .getType() == ContractTypeEnum.Sign) {
                        SimaCertPersonInfo person = getPersonFromCertificate(tsCert);
                        Resource file = storageService.loadAsResource(fileName);
                        if (fileName == null || file == null || !person.getFinCode().equals(simaEncodedContract
                                .getSimaContract().getSignableContainer().getOperationInfo().getAssignee().get(0))) {
                            throw new Exception("file not found");
                        }

                        InputStream is = file.getInputStream();
                        byte[] bytes = IOUtils.toByteArray(is);

                        result = SimaGetFileResponse.builder()
                                .filename(fileName)
                                .data(Base64.getEncoder().encodeToString(bytes))
                                .build();
                        simaEncodedContract.setStatus(ContractStatusEnum.signing);
                        simaEncodedContractRepository.save(simaEncodedContract);

                    }
                } catch (Exception e) {
                    simaEncodedContract.setStatus(ContractStatusEnum.failed);
                    simaEncodedContractRepository.save(simaEncodedContract);
                }
            }
        }
        return result;
    }

    @Override
    public ContractStatusEnum getContractStatusByOperationId(String operationId) {
        Optional<SimaEncodedContract> optSimaContract = simaEncodedContractRepository.findByOperationId(operationId);
        if (optSimaContract.isPresent()) {
            if (optSimaContract.get().getExpDate().after(new Date())) {
                return optSimaContract.get().getStatus();
            } else {
                return ContractStatusEnum.failed;
            }
        } else {
            return ContractStatusEnum.failed;
        }
    }

    @Override
    public AuthenticationResponse getToken(HttpServletRequest request, SimaTokenRequest simaTokenRequest) {
        String ipAddr = getClientIpAddress(request);
        Optional<SimaEncodedContract> findSimaContract = simaEncodedContractRepository
                .findByOperationId(simaTokenRequest.getOperationId());
        log.info("sima getToken findSimaContract : {}", findSimaContract);
        try {
            // && ipAddr.equals(findSimaContract.get().getSignerIP())
            if (findSimaContract.isPresent() && findSimaContract.get().getStatus() == ContractStatusEnum.succesed
                    && oTPService.validateOTPForSima(simaTokenRequest.getPhoneNumber(), simaTokenRequest.getOtpCode(),
                            EPlatform.PHONE)) {
                SimaEncodedContract contract = findSimaContract.get();
                log.info("sima getToken contract : {}", contract);
                SimaCertPersonInfo person = getPersonFromCertificate(contract.getSignerCert());
                log.info(ipAddr + " sima getToken person : {}", person);
                if (contract.getSimaContract().getSignableContainer().getOperationInfo()
                        .getType() == ContractTypeEnum.Auth) {
                    try {
                        FullIDCardInfoResponse idCard = documentInfoService.getIdCardInfoByPin(person.getFinCode());
                        log.info("sima getToken idCard : {}", idCard);
                        person.setPhoneNumber(simaTokenRequest.getPhoneNumber());
                        AuthenticationResponse auth = authenticationService.simaWeb2AppLogin(person, idCard,
                                simaTokenRequest.getPassword());
                        log.info("sima getToken auth : {}", auth);
                        if (auth != null) {
                            contract.setTokenData(auth);
                            return auth;
                        }
                    } catch (Exception e) {
                        log.error("sima getToken error : {}", e);
                    }
                }
            }
        } catch (BadRequestException ex) {
            log.error("sima getToken error : {}", ex);
        }
        return null;
    }

    @Override
    public SimaQRResponse getPdfQR(String fileName, String redirectUrl, String finCode) {
        String result = "";
        Calendar c = Calendar.getInstance();
        Date now = new Date();
        c.setTime(now);
        c.add(Calendar.DATE, 1);
        Date end = c.getTime();
        ProtoInfo protoInfo = ProtoInfo.builder().Name("web2app").Version("1.3").build();
        String operationId = UUID.randomUUID().toString();
        OperationInfo operationInfo = OperationInfo.builder()
                .Type(ContractTypeEnum.Sign) // send type with request
                .OperationId(operationId)
                .NbfUTC(dateToUtcTimestamp(truncateDate(now)))
                .ExpUTC(dateToUtcTimestamp(truncateDate(end)))
                .Assignee(Arrays.asList(finCode))
                .build();
        ClientInfo clientInfo = ClientInfo.builder()
                .ClientId(clientId)
                .ClientName(clientName)
                .IconURI(iconUri)
                .Callback(callBackUri)
                .RedirectURI(redirectUrl)
                .build();
        SignableContainer signableContainer = SignableContainer.builder()
                .ProtoInfo(protoInfo)
                .OperationInfo(operationInfo)
                .ClientInfo(clientInfo)
                .DataInfo(DataInfo.builder()
                        .DataURI(getDataUri
                                .concat("?operationId=").concat(operationId)
                                .concat("&fileName=").concat(fileName))
                        .build())
                .build();
        try {
            String signableContainerStr = om.writeValueAsString(signableContainer).trim();
            String s = hmacSHA256(masterKey, signableContainerStr);
            Header header = Header.builder()
                    .AlgName("HMACSHA256")
                    .Signature(base64Encode(s))
                    .build();
            SimaContract simaContract = SimaContract.builder()
                    .SignableContainer(signableContainer)
                    .Header(header)
                    .build();
            String simaContractStr = om.writeValueAsString(simaContract).trim();
            log.info("sima simaContractStr : {}", simaContractStr);
            String encodedContract = base64Encode(simaContractStr);
            String qrStr = getFileUri.concat(encodedContract);
            BufferedImage qrImage = generateQRCodeImage(qrStr);
            result = imgToBase64String(qrImage, "png");
            SimaEncodedContract simaEncodedContract = SimaEncodedContract.builder()
                    .encodedContract(encodedContract)
                    .simaContract(simaContract)
                    .operationId(operationId)
                    .createDate(now)
                    .expDate(end)
                    .status(ContractStatusEnum.created)
                    .signerFin(finCode)
                    .fileName(fileName)
                    .build();
            simaEncodedContractRepository.insert(simaEncodedContract);
        } catch (JsonProcessingException ex) {
            log.error("Error", ex);
        } catch (Exception ex) {
            log.error("Error", ex);
        }
        return SimaQRResponse.builder().image(result).operationId(operationId).build();
    }

}
