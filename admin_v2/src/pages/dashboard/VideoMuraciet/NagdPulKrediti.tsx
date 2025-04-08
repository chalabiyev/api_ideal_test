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
import TabFamilyInformation from 'src/components/NewCredit/TabFamilyInformation';
import TabContract from 'src/components/NewCredit/TabContract';
import { CreditRequestDto, Partner } from 'src/types/CreditRequestDto';
import { SignalType } from 'src/components/video-call/WebsocketTypes';
import { v4 as uuidv4 } from 'uuid';
import PensionerTab from './PensionerTab';
import TabAKB from 'src/components/NewCredit/TabAKB';
import { AKB_STATE_TYPE } from './types';
import { getPartnerById } from 'src/api/PartnerService';

// ----------------------------------------------------------------------

const metadata = { title: `Video müraciət | Nağd ` };
// FIXME : Cihan : sadece video imza tabında değil diğer tablarda da web socket lazım  olabilir o yüzden bu sayfaya taşıdım.

// FIXME : ILKIN : Tamam
let wsNK: WebSocket;

export default function Page() {
  const [AKB_STATE, setAKB_STATE] = useState<AKB_STATE_TYPE>({
    reportId: 'RP-202502261234',
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
    liabilities: {
      liability: [
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
          firstContractDueOn: '2023-06-10',
          interestRate: '14%',
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
          coBorrowerCount: '0',
          frameworkContractId: 'FRC-98765',
          collateralCode: 'CLT-0001',
          collateralRegistryAgency: 'Əmlak Məsələləri Dövlət Xidməti',
          collateralRegistryNo: 'CL-2023-456',
          collateralAnyInfo: 'Əlavə təminat yoxdur',
          collateralMarketValue: '17000 AZN',
          creditStatusCloseDate: '',
          history: {
            historyItem: [
              {
                overdueDays: '2',
                reportingPeriod: '2024-12-12',
                creditStatus: 'Tam ödənilmiş',
              },
              {
                overdueDays: '0',
                reportingPeriod: '2025-01-01',
                creditStatus: 'Balansdan silinmiş',
              },
            ],
          },
          initialAmountHistory: '15000',
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
          firstContractDueOn: '2023-06-10',
          interestRate: '14%',
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
          coBorrowerCount: '0',
          frameworkContractId: 'FRC-98765',
          collateralCode: 'CLT-0001',
          collateralRegistryAgency: 'Əmlak Məsələləri Dövlət Xidməti',
          collateralRegistryNo: 'CL-2023-456',
          collateralAnyInfo: 'Əlavə təminat yoxdur',
          collateralMarketValue: '17000 AZN',
          creditStatusCloseDate: '',
          history: {
            historyItem: [
              {
                overdueDays: '2',
                reportingPeriod: '2024-12-12',
                creditStatus: 'Tam ödənilmiş',
              },
              {
                overdueDays: '0',
                reportingPeriod: '2025-01-01',
                creditStatus: 'Balansdan silinmiş',
              },
            ],
          },
          initialAmountHistory: '15000',
        },
      ],
    },
    coBorrowers: 'Yoxdur',
    guarantee: 'Yoxdur',
    inquiryHistory: {
      inquiryHistoryItem: [
        {
          inqOrgIDType: 'Bank',
          inqBankId: 'PA001',
          inqBankName: 'ABB',
          inqDate: '2024-10-20',
          inqPurposeId: 'Kredit müraciəti',
          inqType: 'Fiziki şəxs',
        },
        {
          inqOrgIDType: 'Bank',
          inqBankId: 'PA001',
          inqBankName: 'ABB',
          inqDate: '2024-10-20',
          inqPurposeId: 'Kredit müraciəti',
          inqType: 'Fiziki şəxs',
        },
      ],
    },
    score: {
      calculated: '40',
    },
    balance: 100,
    comments: 'Borcalan vaxtında ödəniş etməyə çalışır, lakin kiçik gecikmələr olub.',
  });

  // eslint-disable-next-line
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const clientPin: string = queryParams.get('pin') ?? '';
  const clientId: string = queryParams.get('clientId') ?? '';
  const operatorId: string = queryParams.get('operatorId') ?? '';
  const partnerId: string = queryParams.get('partnerId') ?? '';

  // tab changes
  const [value, setValue] = React.useState('1');
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [pin, setPin] = React.useState<string>('');
  const [seriaNo, setSeriaNo] = React.useState<string>('');

  // guarantor
  const [guarantorInfo, setGuarantorInfo] = React.useState<any>(null);
  const [guarantorPin, setGuarantorPin] = React.useState<string>('');
  const [guarantorSeriaNo, setGuarantorSeriaNo] = React.useState<string>('');

  const guarantorEndpoint = `/document/getIdCardInfo?pin=${guarantorPin}&documentNumber=${guarantorSeriaNo}`;
  const {
    data: guarantorData,
    error: guarantorError,
    hasData: hasGuarantorData,
    loading: guarantorLoading,
    refetch: guarantorRefetch,
  } = useApi(guarantorEndpoint);

  const endpoint = `/document/getIdCardInfoByPin?pin=${pin}`;
  const { data, error, hasData, loading, refetch } = useApi(endpoint);
  const endpointUserByUserName = `/auth/getUserByUserName/${pin}`;
  const { data: userData } = useApi(endpointUserByUserName);
  const [creditRequest, setCreditRequest] = useState<CreditRequestDto>({
    creditAmount: 0,
    creditTerm: 12,
    annualPercent: 0,
    serviceRate: 1.5,
    insuranceCost: 1,
    cartCost: 10,
    valuationCost: 0,
    contractFileName: '',
    videoSignText: '',
    requestedUserPin: '',
    phoneNumber: '',
    requestDate: new Date(),
    decisionQueryEnabled: false,
    guarantors: [],
    // --------------------recurit ---------------------------recurit ------------------------------recurit --------------
    recruiter: {
      active: [
        {
          employer: {
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
          employee: {
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
          contract: {
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
      deactive: [
        {
          employee: {
            position: '',
            salary: 0,
          },
          employer: {
            name: 'Claradix',
            voen: '4312213',
          },
          contract: {
            terminateDate: '',
            beginDate: '',
            endDate: '',
          },
        },
      ],
    },
    // --------------------pension---------------------------pension------------------------------pension--------------
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
        {
          beginDate: 'Başlanğıc tarixi',
          type: {
            id: 0,
            description: 'Identifikasiyaya uyğun izah 2',
          },
          group: {
            id: 0,
            description: 'Identifikasiyaya uyğun izah',
          },
          amount: 0,
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
  } = useApi(`/asan-finance/getPensionerInfoByPin?pin=${pin}`);

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

  // Call this function only to set the userInfo after data is fetched
  const getUserInfo = async () => {
    if (hasData) {
      if (userData) data.phoneNumber = userData.phoneNumber;
      setUserInfo(data);
      let newCreditRequest = { ...creditRequest, requestedUserPin: userData.username, phoneNumber: userData.phoneNumber, requestDate: new Date(), spouses: [] };
      if (partnerId) {
        let partner = await getPartnerById(partnerId);
        if (partner) newCreditRequest = { ...newCreditRequest, partner: partner };
      }
      setCreditRequest(newCreditRequest);
    }
  };

  const getGuarantorInfo = () => {
    if (hasGuarantorData) {
      setGuarantorInfo(guarantorData);
      setCreditRequest({
        ...creditRequest,
        guarantors: [guarantorData],
      });
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
    getGuarantorInfo();

    // eslint-disable-next-line
  }, [data, guarantorData]);

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
      setInterval(() => {
        if (wsNK.readyState == WebSocket.CLOSED) {
          wsNK = new WebSocket(webSocketUri);
        }
      }, 30000);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Nağd pul krediti"
          links={[{ name: 'Video müraciət' }, { name: 'Nağd pul krediti' }]}
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
                <Tab label="Əlaqəli şəxlər" value="6" />
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
              <TabAKB AKB_STATE={AKB_STATE} setAKB_STATE={setAKB_STATE} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="3">
              <RecruiterData
                setCreditRequest={setCreditRequest}
                pin={pin}
                creditRequest={creditRequest}
                setValue={setValue}
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
                guarantorInfo={guarantorInfo}
                getGuarantorInfo={getGuarantorInfo}
                setPin={setGuarantorPin}
                setSeriaNo={setGuarantorSeriaNo}
                hasData={hasGuarantorData}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="6">
              <TabFamilyInformation />
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
