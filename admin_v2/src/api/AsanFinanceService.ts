import { toast } from 'sonner';
import { EmployeeInfoResponse, PensionerInfoResponse } from 'src/pages/dashboard/VideoMuraciet/types';
import axiosInstance from 'src/utils/axios';

export const GetEmployeeInfoByPin = async (pin: string, fetchFromService: boolean) => {
  try {
    const url = '/asan-finance/getEmployeeInfoByPin?pin='.concat(pin).concat('&fetchFromService=').concat(fetchFromService.toString());
    const response = await axiosInstance.get(url);
    if (response.data !== null) {
      return response.data as EmployeeInfoResponse;
    }
    return toast.error('Məlumat tapılmadı');
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export const GetPensionerInfoByPin = async (pin: string, fetchFromService: boolean) => {
  try {
    const url = '/asan-finance/getPensionerInfoByPin?pin='.concat(pin).concat('&fetchFromService=').concat(fetchFromService.toString());
    const response = await axiosInstance.get(url);
    if (response.data !== null) {
      return response.data as PensionerInfoResponse;
    }
    return toast.error('Məlumat tapılmadı');
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};
