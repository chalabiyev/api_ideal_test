
export const API_KEY = import.meta.env.VITE_API_KEY;

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
// eslint-disable-next-line
import { STORAGE_KEY } from 'src/auth/context/jwt';
// eslint-disable-next-line
import { ContractGenerateResponse } from 'src/types/ContractGenerateResponse';
// eslint-disable-next-line
import { CreditRequest } from 'src/types/CreditRequest';
import { SimaQRResponse } from 'src/types/SimaQRResponse';

const token = localStorage.getItem(STORAGE_KEY);


export const generateContract = async (creditRequest: CreditRequest) => {
    const response = await fetch(`${BASE_URL}/contract/generate`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": API_KEY,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "body": JSON.stringify(creditRequest),
        "method": "POST"
    });
    if (response.ok) {
        const data = await response.json() as ContractGenerateResponse;
        return data;
        // eslint-disable-next-line
    } else {
        return null;
    }
}

export const getPdfQR = async (fileName: string, finCode: string) => {
    const response = await fetch(`${BASE_URL}/sima/getPdfQR/${fileName}/${finCode}`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "method": "GET"
    });
    if (response.ok) {
        const data = await response.json() as SimaQRResponse;
        return data;
        // eslint-disable-next-line
    } else {
        return null;
    }
}