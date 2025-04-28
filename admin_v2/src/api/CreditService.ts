export const API_KEY = import.meta.env.VITE_API_KEY;

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
// eslint-disable-next-line
import { STORAGE_KEY } from 'src/auth/context/jwt';
// eslint-disable-next-line
import { ContractGenerateResponse } from 'src/types/ContractGenerateResponse';
// eslint-disable-next-line
import { CreditRequest, CreditRequestSearchDto, ECreditType } from 'src/types/CreditRequestDto';
// eslint-disable-next-line
import { CreditRequestSearchResponse } from 'src/types/CreditRequestSearchResponse';
// eslint-disable-next-line
import { SimaQRResponse } from 'src/types/SimaQRResponse';

const token = localStorage.getItem(STORAGE_KEY);

function convertToCreditRequest(dto: CreditRequest): CreditRequest {
  const creditRequest: CreditRequest = {
    createdBy: dto.createdBy,
    updatedBy: dto.updatedBy,
    createdDate: dto.createdDate,
    updatedDate: dto.updatedDate,
    id: dto.id,
    phoneNumber: dto.phoneNumber,
    otherPhoneNumbers: dto.otherPhoneNumbers,
    creditAmount: dto.creditAmount,
    creditTerm: dto.creditTerm,
    creditAmountWithText: dto.creditAmountWithText,
    requestDate: dto.requestDate,
    confirmStatus: dto.confirmStatus,
    activateStatus: dto.activateStatus,
    finalStatus: dto.finalStatus,
    requestedUser: dto.requestedUserPin ? { pin: dto.requestedUserPin } : undefined, // Örnek bir dönüşüm
    confirmDate: dto.confirmDate,
    confirmerComment: dto.confirmerComment,
    creditType: dto.creditType,
    serviceRate: dto.serviceRate,
    cartCost: dto.cartCost,
    insuranceCost: dto.insuranceCost,
    valuationCost: dto.valuationCost,
    monthlyPayment: dto.monthlyPayment,
    amountToBePaid: dto.amountToBePaid,
    creditPurpose: dto.creditPurpose,
    annualPercent: dto.annualPercent,
    otherPayment: dto.otherPayment,
    notarialCost: dto.notarialCost,
    insuranceType: dto.insuranceType,
    guarantee: dto.guarantee,
    spouses: dto.spouses,
    fine: dto.fine,
    simaContractOperationId: dto.simaContractOperationId,
    connectedWithBOKT: dto.connectedWithBOKT,
    contractFileName: dto.contractFileName,
    videoSignFileName: dto.videoSignFileName,
    decisionQueryEnabled: dto.decisionQueryEnabled,
    videoSignText: dto.videoSignText,
    partner: dto.partner,
    guarantors: dto.guarantors, // Opsiyonel olanı koruyabiliriz.
    cashPrice: dto.creditDetails?.cashPrice || 0,
    operationType: dto.creditDetails?.operationType || '',
    productName: dto.creditDetails?.productName || '',
  };

  return creditRequest;
}

function convertToCreditRequestDto(request: CreditRequest): CreditRequestDto {
  const creditRequestDto: CreditRequestDto = {
    createdBy: request.createdBy,
    updatedBy: request.updatedBy,
    createdDate: request.createdDate,
    updatedDate: request.updatedDate,
    id: request.id,
    phoneNumber: request.phoneNumber,
    otherPhoneNumbers: request.otherPhoneNumbers,
    creditAmount: request.creditAmount,
    creditTerm: request.creditTerm,
    creditAmountWithText: request.creditAmountWithText,
    requestDate: request.requestDate,
    confirmStatus: request.confirmStatus,
    activateStatus: request.activateStatus,
    finalStatus: request.finalStatus,
    requestedUserPin: request.requestedUser?.pin || undefined, // Örnek bir dönüşüm
    confirmDate: request.confirmDate,
    confirmerComment: request.confirmerComment,
    creditType: request.creditType,
    serviceRate: request.serviceRate,
    cartCost: request.cartCost,
    insuranceCost: request.insuranceCost,
    valuationCost: request.valuationCost,
    monthlyPayment: request.monthlyPayment,
    amountToBePaid: request.amountToBePaid,
    creditPurpose: request.creditPurpose,
    annualPercent: request.annualPercent,
    otherPayment: request.otherPayment,
    notarialCost: request.notarialCost,
    insuranceType: request.insuranceType,
    guarantee: request.guarantee,
    spouses: request.spouses,
    fine: request.fine,
    simaContractOperationId: request.simaContractOperationId,
    connectedWithBOKT: request.connectedWithBOKT,
    contractFileName: request.contractFileName,
    videoSignFileName: request.videoSignFileName,
    decisionQueryEnabled: request.decisionQueryEnabled,
    videoSignText: request.videoSignText,
    partner: request.partner,
    guarantors: request.guarantors || [], // Zorunlu olduğu için boş dizi olarak varsayılan değer.
    //recruiter: request.recruiter || { employeeId: "", department: "" }, // Zorunlu olduğu için varsayılan değer.
    //pensioner: { pensionId: "", pensionAmount: 0 }, // Yeni özellik, varsayılan değer.
    //category: request.category || "", // Varsayılan değer.
    //detail: request.detail || "", // Varsayılan değer.
    creditDetails: {
      // Yeni özellik, varsayılan değerlerle oluşturuldu.
      storeName: '',
      operationType: '',
      productName: '',
      creditTerm: request.creditTerm || 0,
      cashPrice: request.cashPrice || 0,
      creditAmount: request.creditAmount || 0,
      // category: request.category || "",
      // detail: request.detail || "",
      creditAmountInput: request.creditAmount || null,
      annualPercent: request.annualPercent || null,
      monthlyPayment: request.monthlyPayment || null,
      totalPayment: request.amountToBePaid || null,
      cardCost: request.cartCost || null,
      valuationCost: request.valuationCost || null,
      insuranceCost: request.insuranceCost || null,
      creditPurpose: request.creditPurpose || '',
      decisionQueryEnabled: request.decisionQueryEnabled || false,
      serviceRate: request.serviceRate || 0,
    },
  };

  return creditRequestDto;
}

export const createCreditRequest = async (dto: CreditRequestDto) => {
  const creditrequest = convertToCreditRequest(dto);
  const response = await fetch(`${BASE_URL}/creditrequest/createA`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(creditrequest),
    method: 'POST',
  });
  if (response.ok) {
    const data = (await response.json()) as CreditRequest;

    return data;
    // eslint-disable-next-line
  } else {
    return null;
  }
};

export const creditRequestSearch = async (creditRequestSearch: CreditRequestSearchDto) => {
  const response = await fetch(`${BASE_URL}/creditrequest/search`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(creditRequestSearch),
    method: 'POST',
  });
  if (response.ok) {
    const data = (await response.json()) as CreditRequestSearchResponse;
    return data;
    // eslint-disable-next-line
  } else {
    return null;
  }
};

export const countOfCreditRequestsAll = async () => {
  const response = await fetch(`${BASE_URL}/creditrequest/count`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
  });
  if (response.ok) {
    const data = (await response.json()) as number;
    return data;
    // eslint-disable-next-line
  } else {
    return 0;
  }
};

export const countOfCreditRequests = async (creditType: ECreditType) => {
  try {
    const response = await fetch(`${BASE_URL}/creditrequest/countOf/${creditType}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'GET',
    });
    if (response.ok) {
      const data = (await response.json()) as number;
      return data;
      // eslint-disable-next-line
    } else {
      return 0;
    }
  } catch (e) {
    return 0;
  }
};

export const getCreditRequest = async (id: string) => {
  const response = await fetch(`${BASE_URL}/creditrequest/get?id=${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
  });
  if (response.ok) {
    const data = (await response.json()) as CreditRequest;
    return data;
    // eslint-disable-next-line
  } else {
    return null;
  }
};

export const acceptCreditRequestByAdmin = async (id: string) => {
  const response = await fetch(`${BASE_URL}/creditrequest/acceptByAdmin?creditRequestId=${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
  });
  if (response.ok) {
    const data = (await response.json()) as CreditRequest;
    return data;
    // eslint-disable-next-line
  } else {
    return null;
  }
};

export const rejectCreditRequestByAdmin = async (id: string) => {
  const response = await fetch(`${BASE_URL}/creditrequest/rejectByAdmin?creditRequestId=${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
  });
  if (response.ok) {
    const data = (await response.json()) as CreditRequest;
    return data;
    // eslint-disable-next-line
  } else {
    return null;
  }
};
