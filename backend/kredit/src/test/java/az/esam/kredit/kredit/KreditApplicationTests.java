package az.esam.kredit.kredit;

import org.springframework.beans.factory.annotation.Autowired;

import az.esam.kredit.kredit.services.external.idService.DocumentInfoService;
import az.esam.kredit.kredit.services.sima.SimaService;

// @SpringBootTest
class KreditApplicationTests {

    @Autowired
    SimaService simaService;

    @Autowired
    DocumentInfoService documentInfoService;

    // @Test
    void test() throws Exception {

        // ObjectMapper objectMapper = new ObjectMapper();
        // objectMapper.enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        // objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        // objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES);
        // String json =
        // "{\"RequestIdentifier\":null,\"Status\":{\"Name\":\"Successful\",\"Code\":0,\"Message\":\"\"},\"Response\":{\"Active\":[{\"Employer\":{\"Voen\":\"1507071621\",\"Name\":\"″BANKNOTE″
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"WorkerCount\":2,\"Phone\":null,\"LegalAddress\":null,\"PropertyType\":{\"Label\":\"3\",\"Description\":\"Xüsusi
        // mülkiyyət\"}},\"Employee\":{\"Name\":\"ELŞƏN\",\"Surname\":\"QULİYEV\",\"Patronymic\":\"BALAZAYİD
        // OĞLU\",\"Phone\":null,\"WorkPlaceType\":{\"Label\":\"2\",\"Description\":\"Əlavə\"},\"WorkPlace\":\"BANKNOTE
        // MMC\",\"Position\":\"texniki rəhbər\",\"PositionLabourContract\":\"Texniki
        // direktor\",\"Salary\":210.0,\"WorkCasualType\":{\"Label\":\"2\",\"Description\":\"Vaxtamuzd\"},\"SSN\":\"2705199401770\"},\"Contract\":{\"BeginDate\":\"09.04.2025\",\"SignDate\":\"09.04.2025\",\"InsertDate\":\"09.04.2025\",\"EndDate\":null,\"NextEndDate\":null,\"PeriodType\":{\"Label\":\"0\",\"Description\":\"Müddətsiz\"},\"Number\":\"5RWXAGV000800\",\"Status\":{\"Label\":\"1\",\"Description\":\"Qüvvədədir\"},\"Invalidation\":{\"Label\":\"0\",\"Description\":\"Etibarlı\"}}},{\"Employer\":{\"Voen\":\"1703939721\",\"Name\":\"″MYBQT″
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"WorkerCount\":3,\"Phone\":null,\"LegalAddress\":null,\"PropertyType\":{\"Label\":\"3\",\"Description\":\"Xüsusi
        // mülkiyyət\"}},\"Employee\":{\"Name\":\"ELŞƏN\",\"Surname\":\"QULİYEV\",\"Patronymic\":\"BALAZAYİD
        // OĞLU\",\"Phone\":null,\"WorkPlaceType\":{\"Label\":\"2\",\"Description\":\"Əlavə\"},\"WorkPlace\":\"MYBQT
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"Position\":\"Proqramçı\",\"PositionLabourContract\":\"Proqramçı\",\"Salary\":400.0,\"WorkCasualType\":{\"Label\":\"2\",\"Description\":\"Vaxtamuzd\"},\"SSN\":\"2705199401770\"},\"Contract\":{\"BeginDate\":\"07.04.2025\",\"SignDate\":\"07.04.2025\",\"InsertDate\":\"07.04.2025\",\"EndDate\":\"06.11.2025\",\"NextEndDate\":\"06.11.2025\",\"PeriodType\":{\"Label\":\"0\",\"Description\":\"Müddətli\"},\"Number\":\"5RWXAGV000700\",\"Status\":{\"Label\":\"1\",\"Description\":\"Qüvvədədir\"},\"Invalidation\":{\"Label\":\"0\",\"Description\":\"Etibarlı\"}}},{\"Employer\":{\"Voen\":\"1703177461\",\"Name\":\"\\\"TOYPAY\\\"
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"WorkerCount\":1,\"Phone\":null,\"LegalAddress\":\"BAKI-SƏBAİL\",\"PropertyType\":{\"Label\":\"3\",\"Description\":\"Xüsusi
        // mülkiyyət\"}},\"Employee\":{\"Name\":\"ELŞƏN\",\"Surname\":\"QULİYEV\",\"Patronymic\":\"BALAZAYİD
        // OĞLU\",\"Phone\":null,\"WorkPlaceType\":{\"Label\":\"2\",\"Description\":\"Əlavə\"},\"WorkPlace\":\"Ümumi\",\"Position\":\"Direktor,
        // müəssisə\",\"PositionLabourContract\":\"Direktor,
        // müəssisə\",\"Salary\":300.0,\"WorkCasualType\":{\"Label\":\"2\",\"Description\":\"Vaxtamuzd\"},\"SSN\":\"2705199401770\"},\"Contract\":{\"BeginDate\":\"17.11.2021\",\"SignDate\":\"03.12.2021\",\"InsertDate\":\"03.12.2021\",\"EndDate\":null,\"NextEndDate\":null,\"PeriodType\":{\"Label\":\"0\",\"Description\":\"Müddətsiz\"},\"Number\":\"5RWXAGV000300\",\"Status\":{\"Label\":\"1\",\"Description\":\"Qüvvədədir\"},\"Invalidation\":{\"Label\":\"0\",\"Description\":\"Etibarlı\"}}}],\"Deactive\":[{\"Employer\":{\"Name\":\"″MYBQT″
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"Voen\":\"1703939721\"},\"Employee\":{\"Position\":\"Proqramçı\",\"Salary\":200.0},\"Contract\":{\"BeginDate\":\"05.04.2025\",\"EndDate\":\"04.11.2025\",\"TerminateDate\":null}},{\"Employer\":{\"Name\":\"″ESAM
        // LAB″ MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"Voen\":\"1506817041\"},\"Employee\":{\"Position\":\"PROQRAM
        // TƏMİNATLARININ HAZIRLANMASI VƏ LAYİHƏLƏRİN İDARƏ OLUNMASI ŞÖBƏSİNİN
        // RƏHBƏRİ\",\"Salary\":400.0},\"Contract\":{\"BeginDate\":\"14.10.2024\",\"EndDate\":null,\"TerminateDate\":\"27.11.2024\"}},{\"Employer\":{\"Name\":\"″PRECOR
        // BAKU″ MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"Voen\":\"1406731631\"},\"Employee\":{\"Position\":\"Texniki
        // Direktor\",\"Salary\":1699.0},\"Contract\":{\"BeginDate\":\"01.03.2024\",\"EndDate\":\"28.02.2025\",\"TerminateDate\":\"18.07.2024\"}},{\"Employer\":{\"Name\":\"\\\"ESAM\\\"
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"Voen\":\"1703157431\"},\"Employee\":{\"Position\":\"Direktor,
        // müəssisə\",\"Salary\":350.0},\"Contract\":{\"BeginDate\":\"13.10.2021\",\"EndDate\":null,\"TerminateDate\":\"01.05.2025\"}},{\"Employer\":{\"Name\":\"\\\"ESAM\\\"
        // MƏHDUD MƏSULİYYƏTLİ
        // CƏMİYYƏTİ\",\"Voen\":\"1703157431\"},\"Employee\":{\"Position\":\"Direktor,
        // müəssisə\",\"Salary\":300.0},\"Contract\":{\"BeginDate\":\"13.10.2021\",\"EndDate\":null,\"TerminateDate\":null}},{\"Employer\":{\"Name\":\"\\\"EVRODİZAYN\\\"
        // QAPALI SƏHMDAR
        // CƏMİYYƏTİ\",\"Voen\":\"2900061521\"},\"Employee\":{\"Position\":\"Zaif
        // cərəyan sistemləri şöbəsinin
        // mühəndisi\",\"Salary\":767.0},\"Contract\":{\"BeginDate\":\"03.09.2018\",\"EndDate\":\"03.03.2019\",\"TerminateDate\":\"04.07.2019\"}},{\"Employer\":{\"Name\":\"\\\"EVRODİZAYN\\\"
        // QAPALI SƏHMDAR
        // CƏMİYYƏTİ\",\"Voen\":\"2900061521\"},\"Employee\":{\"Position\":\"Zaif
        // cərəyan sistemləri şöbəsinin
        // mühəndisi\",\"Salary\":766.0},\"Contract\":{\"BeginDate\":\"03.09.2018\",\"EndDate\":\"03.03.2019\",\"TerminateDate\":null}},{\"Employer\":{\"Name\":\"\\\"EVRODİZAYN\\\"
        // QAPALI SƏHMDAR
        // CƏMİYYƏTİ\",\"Voen\":\"2900061521\"},\"Employee\":{\"Position\":\"Zaif
        // cərəyan sistemləri Departamentinin
        // mühəndisi\",\"Salary\":814.0},\"Contract\":{\"BeginDate\":\"03.09.2018\",\"EndDate\":\"03.03.2019\",\"TerminateDate\":null}}]}}";
        // AsanFinanceResponse<EmployeeInfoResponse> employeeInfoResponse =
        // objectMapper.readValue(
        // json,
        // objectMapper.getTypeFactory().constructParametricType(AsanFinanceResponse.class,
        // EmployeeInfoResponse.class));

        // assertNotNull(employeeInfoResponse);
        // simaService.getAuthQR();
        // String certB64 =
        // "MIIEDjCCA2+gAwIBAgIOH9GmwMxv9DcAAAANMx0wCgYIKoZIzj0EAwMwfDELMAkGA1UEBhMCQVoxOzA5BgNVBAoTMk5hdGlvbmFsIENlcnRpZmljYXRlIFNlcnZpY2VzIENlbnRlciBvZiBBemVyYmFpamFuMTAwLgYDVQQDEydBemVyYmFpamFuIE5hdGlvbmFsIElzc3VpbmcgTW9iaWxlIENBMDEwHhcNMjIwMzE0MDY0MTIyWhcNMjUwMzEzMDY0MTIyWjB5MQswCQYDVQQGEwJBWjEuMCwGA1UEAwwlRsaPUsSwRCDEsFNNQVlJTFpBRMaPIMSwU1JBRsSwTCBPxJ5MVTEWMBQGA1UEBAwNxLBTTUFZSUxaQUTGjzEQMA4GA1UEKgwHRsaPUsSwRDEQMA4GA1UEBRMHNTZNS0ZSWTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJcnIQlvQGxkpDLla7NAnoKUj1hlihQMudOmsReFC1vtxXpnTilOJi3S5l8zkDClW+zfSAa2ttWwsa4ouy68+RijggHWMIIB0jAOBgNVHQ8BAf8EBAMCBsAwHQYDVR0OBBYEFLnwcNxU/4Lohi2gCDuf3pTZqaRqMB8GA1UdIwQYMBaAFI2LbEK25/guXeefWs5oS9s7fjSAMD0GA1UdHwQ2MDQwMqAwoC6GLGh0dHA6Ly9tb2JpbGUuZS1pbXphLmF6L2NkcGFpYS9BWk5JTUNBMDEuY3JsMHIGCCsGAQUFBwEBBGYwZDA4BggrBgEFBQcwAoYsaHR0cDovL21vYmlsZS5lLWltemEuYXovY2RwYWlhL0FaTklNQ0EwMS5jcnQwKAYIKwYBBQUHMAGGHGh0dHA6Ly9tb2JpbGUuZS1pbXphLmF6L29jc3AwPQYJKwYBBAGCNxUHBDAwLgYmKwYBBAGCNxUIgq3GFIGzhxG5kw2G5/lUge2pDIFhhrbOb4GAi2UCAWQCAQkwHwYDVR0lBBgwFgYIKwYBBQUHAwQGCisGAQQBgjcKAwwwKQYJKwYBBAGCNxUKBBwwGjAKBggrBgEFBQcDBDAMBgorBgEEAYI3CgMMMEIGA1UdIAQ7MDkwNwYKKwYBBAGCgEsHATApMCcGCCsGAQUFBwIBFhtodHRwczovL21vYmlsZS5hei9yZXBvc2l0cnkwCgYIKoZIzj0EAwMDgYwAMIGIAkIBZH/fNQEcV8YV89pdIq9OVdyLqP7Yxw9myb3rRiAhvP2adRXoLGvcKoPnSvl+fdYw3YFaFNLvA1BkXBJAh61Yn74CQgD+rH+iKmJ8KWMIzRiXyVf1EtEd3LoB/D3IUETaAgTnx8h1Ud7aZBCsrn5ZIxHzv545hgp4kaoIqsM0bV6Ni8O7Ig==";
        // SimaCertPersonInfo person = simaService.getPersonFromCertificate(certB64);
        // String dataB64 = "YjY1MmEyYTAtYmQ4NS00Njg3LThjYWMtYWMxOTk0ODYzMWMx";
        // String signB64 =
        // "MEUCIGZCLjtrJntX4PLE2sToyXz2fo6oLPJj0MoBaJwSrQ4BAiEAogZRicKMYzmnF2aHqL/L0IWOrVxAwmh/CJoT/ESlJuM=";
        //// String signB64 =
        // "MEUCIQCN+6Di6lGyJlhMTji0whBZQHXtyOb6e6IE4c6RnsguggIgNt0pufpX1El2vTrtGPIqPoiB96qA501SA7JwTI7HMCM=";
        // boolean verify = simaService.verifySign(certB64, dataB64, signB64);
        // String certB64 =
        // "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE36w6HjJ8GS8vaLXEJv8mDG9wM68DQI0eQubdj2Fgt1PQvDbDIiqBwYH5Jpw0XeH/3mcJaQZOqwVziKl6garyRA==";
        // String dataB64 = "YjY1MmEyYTAtYmQ4NS00Njg3LThjYWMtYWMxOTk0ODYzMWMx";
        // String signB64 =
        // "MEYCIQCbo52CdSjBgEGstg1a/HU54ThU0dIt88MaK/ykwhPQ3gIhAKnLYb7bZEuIJ0TeQxzoB7NHoWN9GGhcvTFE+pIM+O4K";
        //// String signB64 =
        // "MEUCIQCN+6Di6lGyJlhMTji0whBZQHXtyOb6e6IE4c6RnsguggIgNt0pufpX1El2vTrtGPIqPoiB96qA501SA7JwTI7HMCM=";
        // boolean verify = simaService.verifySign(certB64, dataB64, signB64);
        // String certB64 =
        // "MIIEijCCA+ygAwIBAgIOH9GmwMxv9DcAAAB64DswCgYIKoZIzj0EAwMwfDELMAkGA1UEBhMCQVoxOzA5BgNVBAoTMk5hdGlvbmFsIENlcnRpZmljYXRlIFNlcnZpY2VzIENlbnRlciBvZiBBemVyYmFpamFuMTAwLgYDVQQDEydBemVyYmFpamFuIE5hdGlvbmFsIElzc3VpbmcgTW9iaWxlIENBMDEwHhcNMjQxMjA2MTM0NTA5WhcNMjcxMjA2MTM0NTA5WjCBuzEbMBkGA1UEDAwSSMO8cXVxaSBUyZltc2lsw6dpMQswCQYDVQQGEwJBWjETMBEGA1UEChMKVE9ZUEFZIE1NQzEXMBUGA1UECxMOVElOOjE3MDMxNzc0NjExKjAoBgNVBAMMIUVMxZ7Gj04gUVVMxLBZRVYgQkFMQVpBWcSwRCBPxJ5MVTERMA8GA1UEBAwIUVVMxLBZRVYxEDAOBgNVBCoMB0VMxZ7Gj04xEDAOBgNVBAUTBzVSV1hBR1YwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATenFm2VEXhZ7ivqJx0ODwkt1nY07YajjbHLeIJp0wHuGnEkYX+dqdtLgWf2mRajPbyB7c8JwWOJiJej4v1oX1po4ICEDCCAgwwDgYDVR0PAQH/BAQDAgbAMB0GA1UdDgQWBBS1MZEPALUHCiEXSqvA/hSWtOMmkjA4BgNVHREEMTAvhgtBXzU2MTk0Mzk3OIYgU0lEX2hKWjNRSzdIZkJoNENPTUZ6NE9IaGdzR2hGbz0wHwYDVR0jBBgwFoAUjYtsQrbn+C5d559azmhL2zt+NIAwPQYDVR0fBDYwNDAyoDCgLoYsaHR0cDovL21vYmlsZS5lLWltemEuYXovY2RwYWlhL0FaTklNQ0EwMS5jcmwwcgYIKwYBBQUHAQEEZjBkMDgGCCsGAQUFBzAChixodHRwOi8vbW9iaWxlLmUtaW16YS5hei9jZHBhaWEvQVpOSU1DQTAxLmNydDAoBggrBgEFBQcwAYYcaHR0cDovL21vYmlsZS5lLWltemEuYXovb2NzcDA9BgkrBgEEAYI3FQcEMDAuBiYrBgEEAYI3FQiCrcYUgbOHEbmTDYbn+VSB7akMgWGGts5vgYCLZQIBZAIBCTAfBgNVHSUEGDAWBggrBgEFBQcDBAYKKwYBBAGCNwoDDDApBgkrBgEEAYI3FQoEHDAaMAoGCCsGAQUFBwMEMAwGCisGAQQBgjcKAwwwQgYDVR0gBDswOTA3BgorBgEEAYKASwcBMCkwJwYIKwYBBQUHAgEWG2h0dHBzOi8vbW9iaWxlLmF6L3JlcG9zaXRyeTAKBggqhkjOPQQDAwOBiwAwgYcCQgDC1qHT4xOjnIKs6bs07Q0mny3+AWGNEqoQqlrEYjgy5MLd6KjgKrv8YHJQ+vwK7SMcvsCNOogZZjqnLyfmoIHq5wJBBvHb0Hpdr4AFxLRIxCI/XMwg9zIpFAZcmFmSZ3adecTGdGjvDdO6ngh3bcEaWDsE8aO/i1FZUSnlfs9ySZNXTwM=";
        // SimaCertPersonInfo person = simaService.getPersonFromCertificate(certB64);

        // String certB64 =
        // "MIIEBTCCA2agAwIBAgIOH9GmwMxv9DcAAAAw08gwCgYIKoZIzj0EAwMwfDELMAkGA1UEBhMCQVoxOzA5BgNVBAoTMk5hdGlvbmFsIENlcnRpZmljYXRlIFNlcnZpY2VzIENlbnRlciBvZiBBemVyYmFpamFuMTAwLgYDVQQDEydBemVyYmFpamFuIE5hdGlvbmFsIElzc3VpbmcgTW9iaWxlIENBMDEwHhcNMjMwNzE2MTc0ODE5WhcNMjYwNzE1MTc0ODE5WjBwMQswCQYDVQQGEwJBWjEqMCgGA1UEAwwhRUzFnsaPTiBRVUzEsFlFViBCQUxBWkFZxLBEIE/EnkxVMREwDwYDVQQEDAhRVUzEsFlFVjEQMA4GA1UEKgwHRUzFnsaPTjEQMA4GA1UEBRMHNVJXWEFHVjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABM3ygXAW6HylqplciRoJ5t//1bmqNmvZSCzDTQwJfiqUeRdxjUYEDCG3zBDyHBx6ljA1N+DwuXOVCAULSdAR6KWjggHWMIIB0jAOBgNVHQ8BAf8EBAMCBsAwHQYDVR0OBBYEFHnyd8HjlAR8qolr322s2/RBYT2PMB8GA1UdIwQYMBaAFI2LbEK25/guXeefWs5oS9s7fjSAMD0GA1UdHwQ2MDQwMqAwoC6GLGh0dHA6Ly9tb2JpbGUuZS1pbXphLmF6L2NkcGFpYS9BWk5JTUNBMDEuY3JsMHIGCCsGAQUFBwEBBGYwZDA4BggrBgEFBQcwAoYsaHR0cDovL21vYmlsZS5lLWltemEuYXovY2RwYWlhL0FaTklNQ0EwMS5jcnQwKAYIKwYBBQUHMAGGHGh0dHA6Ly9tb2JpbGUuZS1pbXphLmF6L29jc3AwPQYJKwYBBAGCNxUHBDAwLgYmKwYBBAGCNxUIgq3GFIGzhxG5kw2G5/lUge2pDIFhhrbOb4GAi2UCAWQCAQkwHwYDVR0lBBgwFgYIKwYBBQUHAwQGCisGAQQBgjcKAwwwKQYJKwYBBAGCNxUKBBwwGjAKBggrBgEFBQcDBDAMBgorBgEEAYI3CgMMMEIGA1UdIAQ7MDkwNwYKKwYBBAGCgEsHATApMCcGCCsGAQUFBwIBFhtodHRwczovL21vYmlsZS5hei9yZXBvc2l0cnkwCgYIKoZIzj0EAwMDgYwAMIGIAkIBeVAfbDLdcai2TuXDFOi8LCRLNEZlAppJ82dFQ5Lo3ntFCaKef+dw9lqY6msV79jsEAxq26fyeUHAS7NFrJsZEksCQgHmjd//LPhdDtrGC02WIKpA1X4SwZzy1dKj+2xEDYWS1axr95rql00S5ylo9DPSGwECgnI8nWYofieXq7f6OIYkVQ==";
        // SimaCertPersonInfo person = simaService.getPersonFromCertificate(certB64);
    }

}
