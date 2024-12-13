import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_KEY, BASE_URL } from 'src/api/request';
import { STORAGE_KEY } from 'src/auth/context/jwt';

const token = localStorage.getItem(STORAGE_KEY);

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-KEY': API_KEY,
    Authorization: `Bearer ${token}`,
  },
});

interface HallSyncProps {
  _id: string;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const HallSync = ({ _id, countdown, setCountdown, setDisabled }: HallSyncProps) => {
  // Function to handle the sync operation
  const handleSync = async () => {
    setDisabled(true);
    setCountdown(15);

    try {
      await toast.promise(axiosInstance.get(`/sync/syncHalls`, { params: { theatreId: _id } }), {
        loading: 'Zallar sync olunur...',
        success: 'Zallar sync olundu',
        error: 'Sync zamanı səhv oldu',
      });
    } catch (error) {
      toast.error('Sync zamanı səhv oldu: ', error);
    }
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
          // eslint-disable-next-line
        } else {
          clearInterval(timer);
          setDisabled(false);
          return 0;
        }
      });
    }, 1000);

    // eslint-disable-next-line
    return () => clearInterval(timer);
  }, [countdown, setCountdown, setDisabled]);

  return (
    <Button color="inherit" onClick={handleSync} variant="soft" disabled={countdown > 0}>
      Sync
    </Button>
  );
};

export default HallSync;
