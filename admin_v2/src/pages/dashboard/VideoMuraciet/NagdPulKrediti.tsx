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
import { CreditRequestDto } from 'src/types/CreditRequestDto';
import { SignalType } from 'src/components/video-call/WebsocketTypes';
import { v4 as uuidv4 } from 'uuid';
import PensionerTab from './PensionerTab';

// ----------------------------------------------------------------------

const metadata = { title: `Video müraciət | Nağd ` };
// FIXME : Cihan : sadece video imza tabında değil diğer tablarda da web socket lazım  olabilir o yüzden bu sayfaya taşıdım.

// FIXME : ILKIN : Tamam
let wsNK: WebSocket;

export default function Page() {
  // eslint-disable-next-line
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const clientPin: string = queryParams.get('pin') ?? '';
  const clientId: string = queryParams.get('clientId') ?? '';
  const operatorId: string = queryParams.get('operatorId') ?? '';

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
    data: _EMPLOYEE_DATA,
    hasData: _EMPLOYEE_HAS_DATA,
    loading: _EMPLOYEE_LOADING,
    refetch: _EMPLOYEE_REFETCH,
    // } = useApi(`/auth/getUserByUserName/${pin}`);
  } = useApi(`/asan-finance/getEmployeeInfoByPin?pin=${pin}`);
  const {
    data: _PENSIONER_DATA,
    hasData: _PENSIONER_HAS_DATA,
    loading: _PENSIONER_LOADING,
    refetch: _PENSIONER_REFETCH,
    // } = useApi(`/auth/getUserByUserName/${pin}`);
  } = useApi(`/asan-finance/getPensionerInfoByPin?pin=${pin}`);

  useEffect(() => {
    if (_EMPLOYEE_HAS_DATA) {
      setCreditRequest((prev) => ({
        ...prev,
        recruiter: _EMPLOYEE_DATA,
      }));
    }

    if (_PENSIONER_HAS_DATA) {
      setCreditRequest((prev) => ({
        ...prev,
        pensioner: _PENSIONER_DATA,
      }));
    }
  }, [_EMPLOYEE_DATA, _EMPLOYEE_HAS_DATA]);
  // ----------------recurit------------------------------recurit------------------------------recurit--------------
  const [newSignal, setNewSignal] = useState<SignalType>();
  const [videoData, setVideoData] = useState('');
  const [contractPdf, setContractPdf] = useState('');

  // Call this function only to set the userInfo after data is fetched
  const getUserInfo = () => {
    if (hasData) {
      if (userData) data.phoneNumber = userData.phoneNumber;
      setUserInfo(data);
      setCreditRequest({
        ...creditRequest,
        requestedUserPin: userData.username,
        phoneNumber: userData.phoneNumber,
        requestDate: new Date(),
        spouses: [],
      });
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
      } catch (error) {}
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
                <Tab label="İş yeri" value="2" />
                <Tab label="Təqaüd məlumatları" value="3" />
                <Tab label="Zaminlik haqqında məlumat" value="4" />
                <Tab label="Əlaqəli şəxlər" value="5" />
                <Tab label="Nəqliyyat vasitələri" value="6" />
                <Tab label="Kredit ver" value="7" />
                <Tab label="Video qeydiyyat" value="8" />
                <Tab label="Müqavilə" value="9" />
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
              <RecruiterData creditRequest={creditRequest} setValue={setValue} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="3">
              <PensionerTab
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
                setValue={setValue}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="4">
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

            <TabPanel sx={{ p: 0 }} value="5">
              <TabFamilyInformation />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="6">
              <TabVehicleInformation setValue={setValue} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="7">
              <TabCreditDataPage
                setValue={setValue}
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="8">
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

            <TabPanel sx={{ p: 0 }} value="9">
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
