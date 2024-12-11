import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Switch,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useApi from 'src/api/useApi';
import { LoadingScreen } from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
import { toast } from 'sonner';
import useDelete from 'src/api/useDelete';
import usePost from 'src/api/usePost';
import { ToastMessages } from 'src/config-global';

const CampaignsListView = () => {
  const [statusID, setStatusID] = useState('');

  const {
    data: _campaignData,
    hasData: _campaignHasData,
    refetch: _campaignRefetch,
    loading: _campaignLoading,
  } = useApi(`/campaign/list`);

  const { deleteData: deleteItem } = useDelete('/campaign/delete');

  const { postData: changeStatus } = usePost(`/campaign/changeStatus/${statusID}`);

  const handleDelete = async (id: string) => {
    if (id) {
      toast.promise(
        deleteItem(id).then(() => {
          _campaignRefetch();
        }),
        {
          loading: ToastMessages.deleting.loading,
          success: () => ToastMessages.deleting.success,
          error: () => ToastMessages.deleting.error,
        }
      );
    }
  };

  const handleChange = async (id: string) => {
    try {
      await changeStatus(`/campaign/changeStatus/${statusID}`);
      toast.success('Status dəyişdirildi');
      _campaignRefetch();
    } catch (error) {
      toast.error('Nə isə səhv oldu');
    }
  };

  if (_campaignLoading) {
    return <LoadingScreen />;
  }

  if (!_campaignHasData) {
    return <EmptyContent title="Kampaniyalar yoxdur" />;
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', minWidth: '200px' }}>Ad</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Açıqlama</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', minWidth: '200px' }}>
              Yeni səhifədə açılsın
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_campaignHasData
            ? _campaignData?.map((campaign: any) => (
                <TableRow key={campaign?.id}>
                  <TableCell>{campaign?.title}</TableCell>
                  <TableCell>{campaign?.description.slice(0, 150)}...</TableCell>
                  <TableCell onMouseEnter={() => setStatusID(campaign?.id)} align="center">
                    <Tooltip title="Saytda bu kampaniyaya klik etdiyimiz zaman yeni səhifədə açılsın ya yox">
                      <Switch
                        checked={campaign?.page}
                        onChange={() => handleChange(campaign?.id)}
                        color="primary"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Sil">
                      <IconButton onClick={() => handleDelete(campaign?.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            : ''}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignsListView;
