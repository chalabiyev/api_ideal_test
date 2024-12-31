
export const API_KEY = import.meta.env.VITE_API_KEY;

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
// eslint-disable-next-line
import { STORAGE_KEY } from 'src/auth/context/jwt';
// eslint-disable-next-line
import { ContractGenerateResponse } from 'src/types/ContractGenerateResponse';
// eslint-disable-next-line
import { CreditRequest, CreditRequestDto, CreditRequestSearchDto, ECreditType } from 'src/types/CreditRequestDto';
// eslint-disable-next-line
import { CreditRequestSearchResponse } from 'src/types/CreditRequestSearchResponse';
// eslint-disable-next-line
import { SimaQRResponse } from 'src/types/SimaQRResponse';

const token = localStorage.getItem(STORAGE_KEY);


export const createCreditRequest = async (creditRequest: CreditRequestDto) => {
    const response = await fetch(`${BASE_URL}/creditrequest/createA`, {
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

export const creditRequestSearch = async (creditRequestSearch: CreditRequestSearchDto) => {
    const response = await fetch(`${BASE_URL}/creditrequest/search`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": API_KEY,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "body": JSON.stringify(creditRequestSearch),
        "method": "POST"
    });
    if (response.ok) {
        const data = await response.json() as CreditRequestSearchResponse;
        return data;
        // eslint-disable-next-line
    } else {
        return null;
    }
}

export const countOfCreditRequestsAll = async () => {
    const response = await fetch(`${BASE_URL}/creditrequest/count`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": API_KEY,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "method": "GET"
    });
    if (response.ok) {
        const data = await response.json() as number;
        return data;
        // eslint-disable-next-line
    } else {
        return 0;
    }
}


export const countOfCreditRequests = async (creditType: ECreditType) => {
    try {
        const response = await fetch(`${BASE_URL}/creditrequest/countOf/${creditType}`, {
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
                "X-API-KEY": API_KEY,
                'Content-Type': 'application/json;charset=UTF-8',
            },
            "method": "GET"
        });
        if (response.ok) {
            const data = await response.json() as number;
            return data;
            // eslint-disable-next-line
        } else {
            return 0;
        }
    } catch (e) {
        return 0;
    }
}

export const getCreditRequest = async (id: string) => {
    const response = await fetch(`${BASE_URL}/creditrequest/get?id=${id}`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": API_KEY,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "method": "GET"
    });
    if (response.ok) {
        const data = await response.json() as CreditRequest;
        return data;
        // eslint-disable-next-line
    } else {
        return null;
    }
}

export const acceptCreditRequestByAdmin = async (id: string) => {
    const response = await fetch(`${BASE_URL}/creditrequest/acceptByAdmin?creditRequestId=${id}`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": API_KEY,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "method": "GET"
    });
    if (response.ok) {
        const data = await response.json() as CreditRequest;
        return data;
        // eslint-disable-next-line
    } else {
        return null;
    }
}

export const rejectCreditRequestByAdmin = async (id: string) => {
    const response = await fetch(`${BASE_URL}/creditrequest/rejectByAdmin?creditRequestId=${id}`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": API_KEY,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        "method": "GET"
    });
    if (response.ok) {
        const data = await response.json() as CreditRequest;
        return data;
        // eslint-disable-next-line
    } else {
        return null;
    }
}