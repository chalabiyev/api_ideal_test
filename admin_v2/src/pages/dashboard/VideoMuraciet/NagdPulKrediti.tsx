import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import TabIdentification from 'src/components/NewCredit/TabIdentification';
import { DashboardContent } from 'src/layouts/dashboard';
import TabGuarantor from 'src/components/NewCredit/TabGuarantor';
import TabVehicleInformation from 'src/components/NewCredit/TabVehicleInformation';
import TabCreditDataPage from 'src/components/NewCredit/TabCreditDataPage';
import TabVideoRecord from 'src/components/NewCredit/TabVideoRecord';
import RecruiterData from 'src/components/NewCredit/RecruiterData';
import TabContract from 'src/components/NewCredit/TabContract';
import { RecruiterState, CreditRequest, Person } from 'src/types/CreditRequest';
import { SignalType } from 'src/components/video-call/WebsocketTypes';
import { v4 as uuidv4 } from 'uuid';
import PensionerTab from './PensionerTab';
import TabAKB from 'src/components/NewCredit/TabAKB';
import { getPartnerById } from 'src/api/PartnerService';
import TabGeneralInformation from 'src/components/NewCredit/TabGeneralInformation';
import request from 'src/api/request';
import { AKBBorrowerScoreResponse, Report } from './types';
import { toast } from 'sonner';


// ----------------------------------------------------------------------

const metadata = { title: `Video müraciət | Nağd ` };
// FIXME : Cihan : sadece video imza tabında değil diğer tablarda da web socket lazım  olabilir o yüzden bu sayfaya taşıdım.

// FIXME : ILKIN : Tamam
let wsNK: WebSocket;

export default function Page() {
  const [AKB_SCORE, setAKB_SCORE] = useState<AKBBorrowerScoreResponse>({
    point: 0,
    pdRate: 0,
    response: ''
  })
  const [AKB_STATE, setAKB_STATE] = useState<Report>({
    id: 'RP-202502261234',
    reportingDate: '2025-02-26',
    borrower: {
      documentNo: 'AZE1234567',
      name: 'Əli Əliyev',
      fin: 'ABC1234',
      dateOfBirth: '1990-05-15',
      placeOfBirth: 'Bakı',
      personType: 'Fiziki şəxs',
      fileDate: '2020-01-10',
      locationCity: 'Bakı',
      registeredAddress: 'Bakı şəhəri, Nəsimi rayonu, Azadlıq prospekti 45',
      status: 'Aktiv',
      participantOfPatrioticWar: true,
    },
    liabilities:
      [
        {
          id: 'CRD-20240001',
          bankId: 'BA001',
          bankName: 'Kapital Bank',
          accountNo: 'AZ23KB0000001234567890',
          creditType: 'İstehlak krediti',
          orgIDType: 'Bank',
          grantedOn: '2023-06-10',
          initialAmount: 15000,
          lineAmount: 15000,
          daysInterestOverdue: 5,
          daysMainSumOverdue: 20,
          contractDueOn: '2026-06-10',
          interestRate: 14,
          lastUpdatedDate: '2025-02-20',
          lastPaymentDate: '2025-01-15',
          outstandingDebtMain: 9000,
          outstandingDebtInterest: 450,
          monthlyPaymentAmount: 750,
          prolongations: 0,
          creditStatus: 'Ödənilir',
          creditPurpose: 'Məişət avadanlığı alacaq',
          currency: 'AZN',
          mkrId: 'MK12345',
          collateralCode: 'CLT-0001',
          collateralRegistryAgency: 'Əmlak Məsələləri Dövlət Xidməti',
          collateralRegistryNo: 'CL-2023-456',
          collateralAnyInfo: 'Əlavə təminat yoxdur',
          creditStatusCloseDate: '',
          history: [
            {
              overdueDays: 2,
              reportingPeriod: '2024-12-12',
              creditStatus: 'Tam ödənilmiş',
            },
            {
              overdueDays: 0,
              reportingPeriod: '2025-01-01',
              creditStatus: 'Balansdan silinmiş',
            },
          ],
        },
        {
          id: 'CRD-20240001',
          bankId: 'BA001',
          bankName: 'Paşa Bank',
          accountNo: 'AZ23KB0000001234567890',
          creditType: 'Avtokredit',
          orgIDType: 'Bank',
          grantedOn: '2023-06-10',
          initialAmount: 15000,
          lineAmount: 15000,
          daysInterestOverdue: 5,
          daysMainSumOverdue: 20,
          contractDueOn: '2026-06-10',
          interestRate: 14,
          lastUpdatedDate: '2025-02-20',
          lastPaymentDate: '2025-01-15',
          outstandingDebtMain: 9000,
          outstandingDebtInterest: 450,
          monthlyPaymentAmount: 750,
          prolongations: 0,
          creditStatus: 'Ödənilir',
          creditPurpose: 'Məişət avadanlığı alacaq',
          currency: 'AZN',
          mkrId: 'MK12345',
          collateralCode: 'CLT-0001',
          collateralRegistryAgency: 'Əmlak Məsələləri Dövlət Xidməti',
          collateralRegistryNo: 'CL-2023-456',
          collateralAnyInfo: 'Əlavə təminat yoxdur',
          creditStatusCloseDate: '',
          history: [
            {
              overdueDays: 2,
              reportingPeriod: '2024-12-12',
              creditStatus: 'Tam ödənilmiş',
            },
            {
              overdueDays: 0,
              reportingPeriod: '2025-01-01',
              creditStatus: 'Balansdan silinmiş',
            },
          ],
        },
      ],
    inquiryHistory: [
      {
        inqOrgIDType: 'Bank',
        inqBankId: 'PA001',
        inqBankName: 'ABB',
        inqDate: '2024-10-20',
        inqPurposeId: 'Kredit müraciəti',
      },
      {
        inqOrgIDType: 'Bank',
        inqBankId: 'PA001',
        inqBankName: 'ABB',
        inqDate: '2024-10-20',
        inqPurposeId: 'Kredit müraciəti',
      },
    ],
    score: {
      calculated: true,
    },
    balance: 100
  });

  // eslint-disable-next-line
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const clientPin: string = queryParams.get('pin') ?? '';
  const clientId: string = queryParams.get('clientId') ?? '';
  const operatorId: string = queryParams.get('operatorId') ?? '';
  const partnerId: string = queryParams.get('partnerId') ?? '';
  const invoiceType: string = queryParams.get('invoiceType') ?? '';
  const itemName: string = queryParams.get('itemName') ?? '';
  const creditDuration: string = queryParams.get('creditDuration') ?? '';
  const cashPrice: string = queryParams.get('cashPrice') ?? '';

  // tab changes
  const [value, setValue] = React.useState('1');
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [pin, setPin] = React.useState<string>('');
  const [seriaNo, setSeriaNo] = React.useState<string>('');

  // guarantor

  const [guarantorPin, setGuarantorPin] = React.useState<string>('');
  const [guarantorSeriaNo, setGuarantorSeriaNo] = React.useState<string>('');

  const guarantorEndpoint = guarantorPin && guarantorSeriaNo
    ? `/document/getIdCardInfo?pin=${guarantorPin}&documentNumber=${guarantorSeriaNo}`
    : '';
  const {
    data: guarantorData,
    error: guarantorError,
    hasData: hasGuarantorData,
    loading: guarantorLoading,
    refetch: guarantorRefetch,
  } = useApi(guarantorEndpoint);

  const endpoint = pin && seriaNo ? `/document/getIdCardInfo?pin=${pin}&documentNumber=${seriaNo}` : pin ? `/document/getIdCardInfoByPin?pin=${pin}` : '';

  const { data, error, hasData, loading, refetch } = useApi(endpoint);
  const endpointUserByUserName = pin ? `/auth/getUserByUserName/${pin}` : '';
  const { data: userData } = useApi(endpointUserByUserName);
  const [recruiterState, setRecruiterState] = useState<RecruiterState>({
    Active: [
      {
        Employer: {
          legalAddress: 'ESAM Innovations',
          workerCount: 12,
          name: 'Qurumun adı',
          propertyType: {
            label: '',
            id: 0,
            type: '',
            description: 'Mülkiyyətin növü',
          },
          voen: '645234236324',
          phone: '+994 50 123 45 67',
        },
        Employee: {
          positionLabourContract: 'Aparıcı',
          ssn: '54213321321',
          workPlaceType: {
            label: '',
            id: 0,
            type: '',
            description: '',
          },
          position: 'Aparıcı',
          salary: 1000,
          workPlace: 'Kapital bank',
        },
        Contract: {
          number: '',
          insertDate: '12.12.2021',
          nextEndDate: '12.12.2022',
          periodType: {
            label: '',
            id: 0,
            type: '',
            description: '',
          },
          beginDate: '12.12.2023',
          signDate: '12.12.2024',
          endDate: '12.12.2025',
        },
      },
    ],
    Deactive: [
      {
        Employee: {
          position: '',
          salary: 0,
        },
        Employer: {
          name: 'Claradix',
          voen: '4312213',
        },
        Contract: {
          terminateDate: '',
          beginDate: '',
          endDate: '',
        },
      },
    ],
  });

  const [creditRequest, setCreditRequest] = useState<CreditRequest>({
    createdBy: '',
    updatedBy: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    id: '',
    phoneNumber: '',
    otherPhoneNumbers: {
      Ev: '',
      Is: '',
      GSM: '',
    },
    creditAmount: 0,
    creditTerm: 12,
    creditAmountWithText: '',
    requestDate: new Date(),
    confirmStatus: 'Requested',
    activateStatus: 'PENDING',
    finalStatus: 'PENDING',
    requestedUser: undefined,
    confirmDate: new Date(),
    confirmerComment: '',
    creditType: 'BELOW_500',
    serviceRate: 1.5,
    cartCost: 10,
    insuranceCost: 1,
    valuationCost: 0,
    monthlyPayment: 0,
    amountToBePaid: 0,
    creditPurpose: '',
    annualPercent: 0,
    otherPayment: 0,
    notarialCost: '',
    insuranceType: '',
    guarantee: 'NONE',
    spouses: [],
    fine: '',
    simaContractOperationId: '',
    contractFileName: '',
    videoSignFileName: '',
    decisionQueryEnabled: false,
    videoSignText: '',
    partner: undefined,
    guarantors: [],
    recruiter: {
      education: '',
      companyName: '',
      salary: 0,
      address: '',
      position: '',
      workPlace: '',
      workAddress: '',
      experience: 0,
      otherIncome: 0,
      voen: '',
      formOfOwnership: '',
      status: '',
      signUpDate: new Date(),
      photo: '',
      departmentId: '',
    },
    cashPrice: 3000,
    operationType: 'product',
    productName: 'iPhone 15 Pro',

    // ILKIN : yeni eklenen
    creditDetails: {
      storeName: 'Kapital Bank',
      operationType: 'product',
      productName: 'iPhone 15 Pro',
      creditTerm: 12,
      cashPrice: 3000,
      creditAmount: 3750,
      category: '',
      detail: '',
      creditAmountInput: 0,
      annualPercent: 0,
      monthlyPayment: 0,
      totalPayment: 0,
      cardCost: 0,
      valuationCost: 0,
      insuranceCost: 0,
      creditPurpose: '',
      decisionQueryEnabled: false,
      serviceRate: 1.5,
    },
    workExperience: '',
    familyMembers: '',
    familyIncome: '',
    isRenting: false,
    rentAmount: '',
    rentDuration: '',
    actualAddress: '',
    additionalIncomes: [{ id: 0, source: '', amount: '' }],
    idQuality: 3,
    generalNote: '',
    relatedPersons: [] as Person[],

    // pensioner data
    pensioner: {
      name: 'Ad',
      patronymic: 'Ata adı',
      birthDate: 'Doğum tarixi',
      surname: 'Soyad',
      allowance: [
        {
          beginDate: 'Başlanğıc tarixi',
          type: {
            id: 0,
            description: 'Identifikasiyaya uyğun izah',
          },
          group: {
            id: 0,
            description: 'Identifikasiyaya uyğun izah',
          },
          amount: 100,
          endDate: 'Bitmə tarixi',
        },
      ],
      pension: [
        {
          type: {
            label: 'Qısa adı',
            id: 0,
            description: 'Identifikasiyaya uyğun izah',
          },
          group: {
            id: 0,
            description: 'Identifikasiyaya uyğun izah',
          },
          amount: 1000,
          startDate: 'Başlanğıc tarixi',
          endDate: '24.32.1223',
        },
      ],
    },
  });

  // -------------------recurit---------------------------recurit------------------------------recurit--------------

  const {
    data: _PENSIONER_DATA,
    hasData: _PENSIONER_HAS_DATA,
    loading: _PENSIONER_LOADING,
    refetch: _PENSIONER_REFETCH,
    // } = useApi(`/auth/getUserByUserName/${pin}`);
  } = useApi(pin ? `/asan-finance/getPensionerInfoByPin?pin=${pin}` : '');

  // useEffect(() => {
  //   if (_PENSIONER_HAS_DATA) {
  //     setCreditRequest((prev) => ({
  //       ...prev,
  //       pensioner: _PENSIONER_DATA,
  //     }));
  //   }
  // }, [_EMPLOYEE_DATA, _EMPLOYEE_HAS_DATA]);

  // ----------------recurit------------------------------recurit------------------------------recurit--------------
  const [newSignal, setNewSignal] = useState<SignalType>();
  const [videoData, setVideoData] = useState('');
  const [contractPdf, setContractPdf] = useState('');
  const calculateCreditAmount = (cashPrice: number, term: number) => {
    const rates = {
      3: 7.53,
      6: 13.7,
      9: 19.1,
      12: 25,
      15: 30,
      18: 34.5,
      24: 40,
    };
    const rate = rates[term as keyof typeof rates] || 0;
    let result = cashPrice + (cashPrice * rate) / 100;
    return Math.ceil(result);
  };
  // Call this function only to set the userInfo after data is fetched
  const getUserInfo = async () => {
    if (hasData) {
      if (userData) data.phoneNumber = userData.phoneNumber;
      setUserInfo(data);
      const creditYear = new Date().getFullYear();
      const creditOrderNo = (await request.get('/creditrequest/countByCreditYear')).data + 1;
      let newCreditRequest: CreditRequest = {
        ...creditRequest,
        creditYear: creditYear,
        creditOrderNo: creditOrderNo,
        requestedUser: userData,
        phoneNumber: userData.phoneNumber,
        requestDate: new Date(),
        spouses: [],
      };
      if (partnerId) {
        let partner = await getPartnerById(partnerId);
        if (partner) {
          newCreditRequest = {
            ...newCreditRequest,
            partner: partner,
            operationType: creditRequest.creditDetails.operationType,
            productName: creditRequest.creditDetails.productName,
            cashPrice: creditRequest.creditDetails.cashPrice,
            creditType: 'PARTNER_CREDIT',
            creditDetails: {
              ...creditRequest.creditDetails,
              storeName: partner.companyName,
            },
          };
        }
      }
      if (cashPrice && creditDuration && invoiceType && itemName) {
        const dblCashPrice = parseFloat(cashPrice);
        const dblCalculateCreditAmount = calculateCreditAmount(dblCashPrice, parseInt(creditDuration));
        newCreditRequest = {
          ...newCreditRequest,
          cashPrice: dblCashPrice,
          operationType: invoiceType == 'məhsul' ? 'product' : 'service',
          productName: itemName,
          creditTerm: parseInt(creditDuration),
          creditAmount: dblCalculateCreditAmount,
          creditType: partnerId ? 'PARTNER_CREDIT' : (dblCalculateCreditAmount > 500 ? 'ABOVE_500' : 'BELOW_500'),
          creditAmountWithText: `${dblCalculateCreditAmount} AZN`,
          creditDetails: {
            ...newCreditRequest.creditDetails,
            cashPrice: dblCashPrice,
            operationType: invoiceType == 'məhsul' ? 'product' : 'service',
            productName: itemName,
            creditTerm: parseInt(creditDuration),
            creditAmount: dblCalculateCreditAmount,
            creditAmountInput: dblCalculateCreditAmount,
          },
          items: [
            {
              productName: itemName,
              unitPrice: dblCashPrice,
              quantity: 1,
              totalPrice: dblCashPrice
            }
          ]
        };
      }
      // if (hasGuarantorData) {
      //   setGuarantorInfo(guarantorData);
      //   newCreditRequest = {
      //     ...newCreditRequest,
      //     guarantors: [guarantorData],
      //   }
      // }
      try {
        const akbResponse = await request.post('/akb/inquireByIdCard', {
          "purposeCode": "001",
          "accept": true,
          "documentSerial": "AZE",
          "documentNo": seriaNo,
          "pinCode": pin,
          "org_id": "135",
          "branchId": "IdealKredit",
          "userId": "IdealKreditBoktWs"
        });
        if (akbResponse) {
          let akbData = akbResponse.data as Report;
          setAKB_STATE(akbData);
          const akbScore = await request.get(`/akb/getBorrowerScore?reportId=${akbData.id}`);
          if (akbScore) {
            setAKB_SCORE(akbScore.data as AKBBorrowerScoreResponse);
          }
        }
      } catch (error) {
        toast.error('AKB bilgileri tapılmadı');
      }

      setCreditRequest(newCreditRequest);
    }
  };

  useEffect(() => {
    if (clientPin) {
      setPin(clientPin);
    }
  }, [clientPin]);

  useEffect(() => {
    // Trigger user info update whenever new data is fetched
    getUserInfo();

    // eslint-disable-next-line
  }, [data]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const webSocketUri = import.meta.env.VITE_WEB_SOCKET_URL;
  const webSocketKey = import.meta.env.VITE_WEB_SOCKET_KEY;

  const handleSocketOpen = () => {
    if (wsNK) {
      wsNK.send(
        JSON.stringify({ type: 'setClientUUID', clientUUID: operatorId, socketKEY: webSocketKey })
      );
    }
  };

  const sendSignal = (data: SignalType) => {
    if (wsNK && wsNK.readyState == WebSocket.OPEN) {
      let msg = { ...data, clientUUID: operatorId, sender: operatorId, receiver: clientId };
      console.log('sendSignal', msg);
      wsNK.send(JSON.stringify(msg));
    }
  };

  const listenSignals = (s: SignalType) => {
    console.log('listenSignals', s);
    if (s.receiver == operatorId) {
      setNewSignal({ ...s, msgid: uuidv4() });
    }
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.data && event.data.trim().length > 0) {
      try {
        let msg = JSON.parse(event.data) as SignalType;
        listenSignals(msg);
      } catch (error) { }
    }
  };

  useEffect(() => {
    if (!wsNK) {
      wsNK = new WebSocket(webSocketUri);
      wsNK.onopen = handleSocketOpen;
      wsNK.onmessage = handleMessage;
      wsNK.onclose = () => {
        console.log('wsNK closed');
      }
      setInterval(() => {
        console.log('wsNK.readyState', wsNK.readyState);
        if (!wsNK || wsNK.readyState == WebSocket.CLOSED) {
          wsNK = new WebSocket(webSocketUri);
          wsNK.onopen = handleSocketOpen;
          wsNK.onmessage = handleMessage;
        }
      }, 10000);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni kredit"
          links={[{ name: 'Video müraciət' }, { name: 'Yeni kredit' }]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     // href={paths.haqqinda.elaveet}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     Əlavə et
          //   </Button>
          // }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Ş/V" value="1" />
                <Tab label="AKB" value="2" />
                <Tab label="İş yeri" value="3" />
                <Tab label="Təqaüd məlumatları" value="4" />
                <Tab label="Zaminlik haqqında məlumat" value="5" />
                <Tab label="Ümumi məlumatlar" value="6" />
                <Tab label="Nəqliyyat vasitələri" value="7" />
                <Tab label="Kredit ver" value="8" />
                <Tab label="Video qeydiyyat" value="9" />
                <Tab label="Müqavilə" value="10" />
              </TabList>
            </Box>

            <TabPanel sx={{ p: 0 }} value="1">
              <TabIdentification
                loading={loading}
                userInfo={userInfo}
                getUserInfo={getUserInfo}
                setValue={setValue}
                setPin={setPin}
                setSeriaNo={setSeriaNo}
                hasData={hasData}
                pinValue={pin}
                seriaNoValue={seriaNo}
                setUserInfo={setUserInfo}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="2">
              <TabAKB AKB_STATE={AKB_STATE} setAKB_STATE={setAKB_STATE} AKB_SCORE={AKB_SCORE} setAKB_SCORE={setAKB_SCORE} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="3">
              <RecruiterData
                setCreditRequest={setCreditRequest}
                pin={pin}
                creditRequest={creditRequest}
                setValue={setValue}
                recruiterState={recruiterState}
                setRecruiterState={setRecruiterState}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="4">
              <PensionerTab
                pin={pin}
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
                setValue={setValue}
              />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="5">
              <TabGuarantor
                setValue={setValue}
                loading={guarantorLoading}
                guarantorInfo={guarantorData}
                setPin={setGuarantorPin}
                setSeriaNo={setGuarantorSeriaNo}
                hasData={hasGuarantorData}
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="6">
              <TabGeneralInformation
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="7">
              <TabVehicleInformation setValue={setValue} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="8">
              <TabCreditDataPage
                setValue={setValue}
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="9">
              <TabVideoRecord
                setValue={setValue}
                userInfo={userInfo}
                newSignal={newSignal}
                sendSignal={sendSignal}
                videoData={videoData}
                setVideoData={setVideoData}
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="10">
              <TabContract
                creditRequest={creditRequest}
                contractPdf={contractPdf}
                setContractPdf={setContractPdf}
                newSignal={newSignal}
                sendSignal={sendSignal}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardContent>
    </>
  );
}
