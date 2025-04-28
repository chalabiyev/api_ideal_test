import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import { toast } from 'sonner';
import { CreditRequest } from 'src/types/CreditRequestDto';
import { generateContract, getPdfQR, getSimaStatus, SimaStatus } from 'src/api/ContractService';
import { ContractGenerateResponse } from 'src/types/ContractGenerateResponse';
import { callGetFile } from 'src/api/FileService';
import { SimaQRResponse } from 'src/types/SimaQRResponse';
import { SignalType } from '../video-call/WebsocketTypes';
import { createCreditRequest } from 'src/api/CreditService';

const TabContract = ({ creditRequest, contractPdf, setContractPdf, newSignal, sendSignal, setCreditRequest }:
  {
    creditRequest: CreditRequest, contractPdf: string; setContractPdf: any; setCreditRequest: any;
    newSignal: SignalType | undefined;
    sendSignal: (s: SignalType) => void;
  }) => {
  const [isSigning, setIsSigning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contractGenerating, setContractGenerating] = useState(false);
  const [simaOperationId, setSimaOperationId] = useState<string>();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [checkCounter, setCheckCounter] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [contractCreated, setContractCreated] = useState(false);

  const handleSign = async () => {
    setCheckCounter(1);
    setOpenDialog(true);
    sendSignal({ type: 'signPdf', msg: creditRequest.contractFileName });
  };


  useEffect(() => {
    if (contractCreated) {
      callGetFile(creditRequest.contractFileName!).then((file) => {
        if (file) {
          setContractPdf(file);
        }
      });
      createCreditRequest(creditRequest).then((res) => {
        if (res) {
          setCreditRequest(res);
          toast.success('Müraciət uğurla bildirildi!');
        } else {
          toast.error('Müraciət yaradılmadı!');
        }
      }).catch(() => {
        toast.error('Müraciət yaradılmadı!');
      });
    }
  }, [contractCreated]);

  const checkSignStatus = () => {
    if (simaOperationId && creditRequest.contractFileName && !contractCreated) {
      setCheckCounter(checkCounter + 1);
      if (checkCounter > 10) {
        if (intervalId)
          clearInterval(intervalId);
        setIsSigning(false);
        setOpenDialog(false);
        toast.error('Müqavilə imzalanmadı.');
      }
      getSimaStatus(simaOperationId).then((res: SimaStatus) => {
        if (res == SimaStatus.Success) {
          if (intervalId)
            clearInterval(intervalId);
          setIsSigning(false);
          setOpenDialog(false);
          setContractCreated(true);
          setCurrentStatus('Müqavilə uğurla imzalandı!');
        } else if (res == SimaStatus.Failed) {
          if (intervalId)
            clearInterval(intervalId);
          toast.error('Müqavilə imzalanmadı.');
          setIsSigning(false);
          setOpenDialog(false);
        }
      });
    }
  }

  useEffect(() => {
    if (simaOperationId && creditRequest.contractFileName) {
      setCheckCounter(1);
      if (intervalId) {
        clearInterval(intervalId);
      }
      const newIntervalId = window.setInterval(() => checkSignStatus(), 3000);
      setIntervalId(newIntervalId);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [simaOperationId]);


  useEffect(() => {
    if (newSignal?.type == 'signingPdf' && newSignal.msg) {
      setCurrentStatus('Müqavilə imzalanır...');
      setSimaOperationId(newSignal.msg);
      setOpenDialog(true);
      setIsSigning(true);
    }
  }, [newSignal]);

  useEffect(() => {
    if (creditRequest && !contractGenerating) {
      setContractGenerating(true);
      generateContract(creditRequest).then((res: ContractGenerateResponse | null) => {
        if (res?.status == 'success') {
          setCreditRequest({ ...creditRequest, contractFileName: res.pdfName });
          callGetFile(res.pdfName).then((file) => {
            if (file) {
              setContractPdf(file);
              setContractGenerating(false);
            }
            else {
              toast.error("Müqavilə tərtib olunmadı!");
              setContractGenerating(false);
            }
          }).catch((err) => {
            toast.error("Müqavilə tərtib olunmadı!");
            setContractGenerating(false);
          });
        }
      }).catch((err) => {
        toast.error("Müqavilə tərtib olunmadı!");
        setContractGenerating(false);
      });
    }
  }, [creditRequest]);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Müqavilə
      </Typography>

      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent
          sx={{
            border: '1px solid ',
            borderRadius: '10px',
            maxHeight: '400px',
            overflow: 'auto',
          }}
        >
          {contractGenerating && <Typography>Müqavilə yaradılır...</Typography>}
          {!contractGenerating && <embed src={`${contractPdf}#toolbar=0&navpanes=0&scrollbar=0`} width="100%" height="400px" />}
        </CardContent>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="success"
            variant="contained"
            onClick={handleSign}
            disabled={isSigning} // Disable the button while signing
            sx={{ textTransform: 'none' }}
          >
            Sima ilə imzalaması üçün təstiqə göndər
          </Button>
        </Box>
      </Card>

      {/* Dialog for signing */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          {isSigning && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
                gap: 2,
              }}
            >
              <Typography variant="h6"> {currentStatus} </Typography>
              <CircularProgress color="success" size={20} />
            </Box>
          )}

          {isSigning ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
                marginLeft: 9,
              }}
            >
              <img src="/signing.gif" alt="Signing" width={330} height={290} />
              <Typography>{currentStatus}</Typography>
            </Box>
          ) : (
            <Typography>{currentStatus}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" disabled={isSigning}>
            Bağla
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TabContract;
