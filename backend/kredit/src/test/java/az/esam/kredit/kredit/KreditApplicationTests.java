package az.esam.kredit.kredit;

import az.esam.kredit.kredit.entities.sima.SimaCertPersonInfo;
import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import az.esam.kredit.kredit.services.sima.SimaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

//@SpringBootTest
class KreditApplicationTests {

    @Autowired
    SimaService simaService;

    @Autowired
    DocumentInfoService documentInfoService;

//    @Test
    void test() throws Exception {
        
//        simaService.getAuthQR();
        
//        String certB64 = "MIIEDjCCA2+gAwIBAgIOH9GmwMxv9DcAAAANMx0wCgYIKoZIzj0EAwMwfDELMAkGA1UEBhMCQVoxOzA5BgNVBAoTMk5hdGlvbmFsIENlcnRpZmljYXRlIFNlcnZpY2VzIENlbnRlciBvZiBBemVyYmFpamFuMTAwLgYDVQQDEydBemVyYmFpamFuIE5hdGlvbmFsIElzc3VpbmcgTW9iaWxlIENBMDEwHhcNMjIwMzE0MDY0MTIyWhcNMjUwMzEzMDY0MTIyWjB5MQswCQYDVQQGEwJBWjEuMCwGA1UEAwwlRsaPUsSwRCDEsFNNQVlJTFpBRMaPIMSwU1JBRsSwTCBPxJ5MVTEWMBQGA1UEBAwNxLBTTUFZSUxaQUTGjzEQMA4GA1UEKgwHRsaPUsSwRDEQMA4GA1UEBRMHNTZNS0ZSWTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJcnIQlvQGxkpDLla7NAnoKUj1hlihQMudOmsReFC1vtxXpnTilOJi3S5l8zkDClW+zfSAa2ttWwsa4ouy68+RijggHWMIIB0jAOBgNVHQ8BAf8EBAMCBsAwHQYDVR0OBBYEFLnwcNxU/4Lohi2gCDuf3pTZqaRqMB8GA1UdIwQYMBaAFI2LbEK25/guXeefWs5oS9s7fjSAMD0GA1UdHwQ2MDQwMqAwoC6GLGh0dHA6Ly9tb2JpbGUuZS1pbXphLmF6L2NkcGFpYS9BWk5JTUNBMDEuY3JsMHIGCCsGAQUFBwEBBGYwZDA4BggrBgEFBQcwAoYsaHR0cDovL21vYmlsZS5lLWltemEuYXovY2RwYWlhL0FaTklNQ0EwMS5jcnQwKAYIKwYBBQUHMAGGHGh0dHA6Ly9tb2JpbGUuZS1pbXphLmF6L29jc3AwPQYJKwYBBAGCNxUHBDAwLgYmKwYBBAGCNxUIgq3GFIGzhxG5kw2G5/lUge2pDIFhhrbOb4GAi2UCAWQCAQkwHwYDVR0lBBgwFgYIKwYBBQUHAwQGCisGAQQBgjcKAwwwKQYJKwYBBAGCNxUKBBwwGjAKBggrBgEFBQcDBDAMBgorBgEEAYI3CgMMMEIGA1UdIAQ7MDkwNwYKKwYBBAGCgEsHATApMCcGCCsGAQUFBwIBFhtodHRwczovL21vYmlsZS5hei9yZXBvc2l0cnkwCgYIKoZIzj0EAwMDgYwAMIGIAkIBZH/fNQEcV8YV89pdIq9OVdyLqP7Yxw9myb3rRiAhvP2adRXoLGvcKoPnSvl+fdYw3YFaFNLvA1BkXBJAh61Yn74CQgD+rH+iKmJ8KWMIzRiXyVf1EtEd3LoB/D3IUETaAgTnx8h1Ud7aZBCsrn5ZIxHzv545hgp4kaoIqsM0bV6Ni8O7Ig==";
//        SimaCertPersonInfo person = simaService.getPersonFromCertificate(certB64);

//        String dataB64 = "YjY1MmEyYTAtYmQ4NS00Njg3LThjYWMtYWMxOTk0ODYzMWMx";
//        String signB64 = "MEUCIGZCLjtrJntX4PLE2sToyXz2fo6oLPJj0MoBaJwSrQ4BAiEAogZRicKMYzmnF2aHqL/L0IWOrVxAwmh/CJoT/ESlJuM=";
////        String signB64 = "MEUCIQCN+6Di6lGyJlhMTji0whBZQHXtyOb6e6IE4c6RnsguggIgNt0pufpX1El2vTrtGPIqPoiB96qA501SA7JwTI7HMCM=";
//        boolean verify = simaService.verifySign(certB64, dataB64, signB64);


//        String certB64 = "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE36w6HjJ8GS8vaLXEJv8mDG9wM68DQI0eQubdj2Fgt1PQvDbDIiqBwYH5Jpw0XeH/3mcJaQZOqwVziKl6garyRA==";
//        String dataB64 = "YjY1MmEyYTAtYmQ4NS00Njg3LThjYWMtYWMxOTk0ODYzMWMx";
//        String signB64 = "MEYCIQCbo52CdSjBgEGstg1a/HU54ThU0dIt88MaK/ykwhPQ3gIhAKnLYb7bZEuIJ0TeQxzoB7NHoWN9GGhcvTFE+pIM+O4K";
////        String signB64 = "MEUCIQCN+6Di6lGyJlhMTji0whBZQHXtyOb6e6IE4c6RnsguggIgNt0pufpX1El2vTrtGPIqPoiB96qA501SA7JwTI7HMCM=";
//        boolean verify = simaService.verifySign(certB64, dataB64, signB64);
    }

}
