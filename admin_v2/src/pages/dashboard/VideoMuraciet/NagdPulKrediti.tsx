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
import { CreditRequest } from 'src/types/CreditRequest';
import { RecruiterDataType } from './types';
import { SignalType } from 'src/components/video-call/WebsocketTypes';
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------------------------------------------

const metadata = { title: `Video müraciət | Nağd ` };
// FIXME : Cihan : sadece video imza tabında değil diğer tablarda da web socket lazım  olabilir o yüzden bu sayfaya taşıdım.
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
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [creditDuration, setCreditDuration] = useState<number>(12);

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
  const [creditRequest, setCreditRequest] = useState<CreditRequest>({});
  const [newSignal, setNewSignal] = useState<SignalType>();
  const [videoData, setVideoData] = useState('');
  const [contractPdf, setContractPdf] = useState("");
  const [contractFileName, setContractFileName] = useState("");

  // requriment data
  const [recruiterData, setRecruiterData] = useState<RecruiterDataType>({
    education: '',
    companyName: '',
    salary: '',
    address: '',
    position: '',
    workExperience: '',
    contractStartDate: '',
    contractEndDate: '',
    toplamodenis: '',
    akbmelumatlari: '',
    daxilirisk: '',
    ayliqemekhaqqi: '',
    ayliqcemigelir: '',
    xerclerincemi: '',
    xalisgelir: '',
  });

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
      console.log('guarantorData : ', guarantorData);
      setGuarantorInfo(guarantorData);
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

  useEffect(()=>{
    // credit request değiştiyse contract ta değişmeli!.
    setContractPdf("");
  },[creditRequest]);

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
      console.log("sendSignal", msg);
      wsNK.send(JSON.stringify(msg));
    }
  };

  const listenSignals = (s: SignalType) => {
    console.log("listenSignals", s);
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
                <Tab label="İş yeri" value="2" />
                <Tab label="Zaminlik haqqında məlumat" value="3" />
                <Tab label="Əlaqəli şəxlər" value="4" />
                <Tab label="Nəqliyyat vasitələri" value="5" />
                <Tab label="Kredit ver" value="6" />
                <Tab label="Video qeydiyyat" value="7" />
                <Tab label="Müqavilə" value="8" />
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
              <RecruiterData
                recruiterData={recruiterData}
                setRecruiterData={setRecruiterData}
                setValue={setValue}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="3">
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

            <TabPanel sx={{ p: 0 }} value="4">
              <TabFamilyInformation />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="5">
              <TabVehicleInformation setValue={setValue} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="6">
              <TabCreditDataPage
                setValue={setValue}
                creditAmount={creditAmount}
                creditDuration={creditDuration}
                setCreditAmount={setCreditAmount}
                setCreditDuration={setCreditDuration}
                creditRequest={creditRequest}
                setCreditRequest={setCreditRequest}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="7">
              <TabVideoRecord
                setValue={setValue}
                userInfo={userInfo}
                creditAmount={creditAmount}
                creditDuration={creditDuration}                
                newSignal={newSignal}
                sendSignal={sendSignal}
                videoData={videoData}
                setVideoData={setVideoData}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="8">
              <TabContract creditRequest={creditRequest} 
              contractPdf={contractPdf} setContractPdf={setContractPdf}
              contractFileName={contractFileName} setContractFileName={setContractFileName}
              newSignal={newSignal} sendSignal={sendSignal}
               />
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardContent>
    </>
  );
}
