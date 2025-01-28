import { Box, Button } from '@mui/material';
import { toast } from 'sonner';
import usePatch from 'src/api/usePatch';
import usePost from 'src/api/usePost';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const PatchPartnerButton = ({ id, partnerData }: any) => {
  const router = useRouter();
  const { patchData: patchPartner } = usePatch(`/partner/${id}`);

  // Check if any property in partnerData is empty or falsy
  const isFormValid = Object.entries(partnerData).every(
    ([key, value]) =>
      key === 'establishmentDocument' || (value && value !== '') || key === 'url' || key === 'pin'
  );

  const handleCreatePartner = async () => {
    try {
      await patchPartner(partnerData);
      toast.success('Tətbiq edildi');
      router.push(paths.partners.partnyorlarlist);
    } catch (error) {
      toast.success(error);
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

export default PatchPartnerButton;
