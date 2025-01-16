import { Partner } from 'src/types/CreditRequestDto';
import axiosInstance from 'src/utils/axios';

export const postChangePartnerStatus = async (id: string, status: string) => {
  try {
    const url = '/partner/changeStatus?id='.concat(id).concat('&status=').concat(status); 
    const response = await axiosInstance.post(url);
    if (response.data !== null) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export const getPartnerById = async (id: string) => {
  try {
    const url = '/partner/get?id='.concat(id); 
    const response = await axiosInstance.get(url);
    if (response.data !== null) {
      return response.data as Partner;
    }
    return null;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};
