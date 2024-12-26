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
import { CreditRequest } from 'src/types/CreditRequest';
import { generateContract, getPdfQR, getSimaStatus, SimaStatus } from 'src/api/ContractService';
import { ContractGenerateResponse } from 'src/types/ContractGenerateResponse';
import { callGetFile } from 'src/api/FileService';
import { SimaQRResponse } from 'src/types/SimaQRResponse';
import { SignalType } from '../video-call/WebsocketTypes';

const TabContract = ({ creditRequest, contractPdf, setContractPdf, contractFileName, setContractFileName, newSignal, sendSignal }:
  {
    creditRequest: CreditRequest, contractPdf: string; setContractPdf: any; contractFileName: string; setContractFileName: any;
    newSignal: SignalType | undefined;
    sendSignal: (s: SignalType) => void;
  }) => {
  const [isSigning, setIsSigning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contractGenerating, setContractGenerating] = useState(false);
  const [simaOperationId, setSimaOperationId] = useState<string>();
  const [checkCounter, setCheckCounter] = useState(0);

  const handleSign = async () => {
    setCheckCounter(1);
    setOpenDialog(true);
    sendSignal({ type: 'signPdf', msg: contractFileName });
  };

  const checkSignStatus = () => {
    if (simaOperationId) {
      getSimaStatus(simaOperationId).then((res: SimaStatus) => {
        if (res == SimaStatus.Success) {
          setIsSigning(false);
          setOpenDialog(false);
          toast.success('Müqavilə uğurla imzalandı!');
        } else if (res == SimaStatus.Failed) {
          toast.error('Müqavilə imzalanmadı.');
          setIsSigning(false);
          setOpenDialog(false);
          // get signed pdf
          callGetFile(contractFileName).then((file) => {
            if (file) {
              setContractPdf(file);
            }
          });
        } else if (res == SimaStatus.Signing && checkCounter < 5) {
          setTimeout(() => {
            setCheckCounter(checkCounter + 1);
            checkSignStatus();
          }, 5000);
        }
      });
    }
  }

  useEffect(() => {
    if (newSignal?.type == 'signingPdf' && newSignal.msg) {
      setSimaOperationId(newSignal.msg);
      setOpenDialog(true);
      setIsSigning(true);
      checkSignStatus();
    }
  }, [newSignal]);

  useEffect(() => {
    if (creditRequest && !contractPdf) {
      setContractGenerating(true);
      generateContract(creditRequest).then((res: ContractGenerateResponse | null) => {
        if (res?.status == 'success') {
          setContractFileName(res.pdfName);
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
          {/* <Typography variant="body2"> */}
          {/* FIXME : CİHAN : İLKİN BEY BURAYA GÜZEL BİR DİALOG YAZAR MISINIZ? */}
          {contractGenerating && <Typography>Müqavilə yaradılır...</Typography>}
          {!contractGenerating && <embed src={`${contractPdf}#toolbar=0&navpanes=0&scrollbar=0`} width="100%" height="400px" />}
          {/* </Typography> */}
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
              <Typography variant="h6"> İmzalanır </Typography>
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
            </Box>
          ) : (
            <Typography>İmzalama tamamlandı. Nəticə bildirildi.</Typography>
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
