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
import { generateContract, getPdfQR } from 'src/api/ContractService';
import { ContractGenerateResponse } from 'src/types/ContractGenerateResponse';
import { callGetFile } from 'src/api/FileService';
import { SimaQRResponse } from 'src/types/SimaQRResponse';

const TabContract = ({ creditRequest, contractPdf, setContractPdf, contractFileName, setContractFileName }:
  { creditRequest: CreditRequest, contractPdf: string; setContractPdf: any; contractFileName: string; setContractFileName: any; }) => {
  const [isSigning, setIsSigning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contractGenerating, setContractGenerating] = useState(false);
  const [simaQR, setSimaQR] = useState<SimaQRResponse>();

  const handleSign = async () => {
    let res = await getPdfQR(contractFileName, creditRequest.requestedUserPin!);
    if (res) {
      setSimaQR(res);
      setOpenDialog(true);
      setIsSigning(true);
    }

    // Show the signing gif for 2-3 seconds, then display a random toast
    // setTimeout(() => {
    //   const isSigned = Math.random() > 0.5; // Randomly determine if signed or not
    //   setIsSigning(false);
    //   setOpenDialog(false); // Close the dialog after signing
    //   if (isSigned) {
    //     toast.success('Müqavilə uğurla imzalandı!');
    //   } else {
    //     toast.error('Müqavilə imzalanmadı.');
    //   }
    // }, 3000); // Show gif for 2 seconds
  };

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
              toast.error("Kontrakt oluşturulamadı!");
              setContractGenerating(false);
            }
          }).catch((err) => {
            toast.error("Kontrakt oluşturulamadı!");
            setContractGenerating(false);
          });
        }
      }).catch((err) => {
        toast.error("Kontrakt oluşturulamadı!");
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
          {contractGenerating && <Typography>Müqavilə oluşturuluyor...</Typography>}
          {!contractGenerating && <embed src={contractPdf} width="100%" height="400px" />}
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
              <img
                alt='simaqr'
                src={`data:image/jpeg;base64, ${simaQR?.image}`}
                width={350}
                height={350}
              />
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
