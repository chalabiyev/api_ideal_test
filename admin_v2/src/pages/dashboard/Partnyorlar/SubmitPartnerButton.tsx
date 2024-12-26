import { Box, Button } from '@mui/material';
import React from 'react';
import usePost from 'src/api/usePost';

const SubmitPartnerButton = ({ partnerData }: any) => {
  const { postData: createPartner, loading } = usePost(`/partner/create`);

  // Check if any property in partnerData is empty or falsy
  const isFormValid = Object.values(partnerData).every((value) => value && value !== '');

  const handleCreatePartner = async () => {
    try {
      await createPartner(partnerData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ textAlign: 'right', width: '100%' }}>
      <Button
        disabled={!isFormValid} // Disable if form is not valid
        onClick={() => handleCreatePartner()}
        sx={{ width: '100%' }}
        variant="contained"
        size="large"
        color="success"
      >
        Yadda Saxla
      </Button>
    </Box>
  );
};

export default SubmitPartnerButton;
