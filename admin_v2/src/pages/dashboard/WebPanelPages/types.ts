export interface CreditFormData {
  title: string;
  description: string;
  image: string;
  bannerImage: string;
  requirements: {
    age: string;
    documents: string;
    guarantor: string;
    mortgage: string;
  };
  conditions: {
    minAmount: number;
    maxAmount: number;
    minPeriod: number;
    maxPeriod: number;
    minRate: number;
    maxRate: number;
    minFIFD: number;
    maxFIFD: number;
    currency: string;
    commissionRate: number;
    requiredDocuments: string;
  };
  videoDescription: {
    title: string;
    shortDescription: string;
    description: string;
    videoUrl: string;
  };
}

// insurence

export interface InsuranceFormData {
  insuranceType: EInsuranceType;
  image: string;
  title: string;
  description: string;
}
export enum EInsuranceType {
  INDIVIDUAL,
  COOPERATIVE,
}
