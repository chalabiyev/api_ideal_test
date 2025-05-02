import { Guarantor } from 'src/pages/dashboard/VideoMuraciet/types';

export type ECreditType =
  | 'ABOVE_500'
  | 'BELOW_500'
  | 'PARTNER_CREDIT'
  | 'BUSINESS_CREDIT'
  | undefined
  | '';

export type EFinalStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | undefined;

export interface RecruiterDataType {
  education?: string;
  companyName?: string;
  salary?: number;
  address?: string;
  position?: string;
  workPlace?: string;
  workAddress?: string;
  experience?: number;
  otherIncome?: number;
  voen?: string;
  formOfOwnership?: string;
  status?: string;
  signUpDate?: Date;
  photo?: string;
  departmentId?: string;
}

export interface RecruiterState {
  Active: Array<{
    Employer: {
      legalAddress: string;
      workerCount: number;
      name: string;
      propertyType: {
        label: string;
        id: number;
        type: string;
        description: string;
      };
      voen: string;
      phone: string;
    };
    Employee: {
      positionLabourContract: string;
      ssn: string;
      workPlaceType: {
        label: string;
        id: number;
        type: string;
        description: string;
      };
      position: string;
      salary: number;
      workPlace: string;
    };
    Contract: {
      number: string;
      insertDate: string;
      nextEndDate: string;
      periodType: {
        label: string;
        id: number;
        type: string;
        description: string;
      };
      beginDate: string;
      signDate: string;
      endDate: string;
    };
  }>;
  Deactive: Array<{
    Employee: {
      position: string;
      salary: number;
    };
    Employer: {
      name: string;
      voen: string;
    };
    Contract: {
      terminateDate: string;
      beginDate: string;
      endDate: string;
    };
  }>;
}

export interface Person {
  id: number;
  name: string;
  note: string;
  phone: string;
  relation: string;
}

export interface AdditionalIncome {
  id: number;
  source: string;
  amount: string;
}

export interface CreditRequest {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  phoneNumber?: string;
  otherPhoneNumbers?: OtherPhoneNumbers;
  creditAmount?: number;
  creditTerm?: number;
  creditAmountWithText?: string;
  requestDate?: Date;
  confirmStatus?: 'Requested' | 'Accepted' | 'Rejected';
  activateStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  finalStatus?: EFinalStatus;
  requestedUser?: User;
  isConnectedWithBOKT?: boolean;
  confirmerUser?: User;
  confirmDate?: Date;
  confirmerComment?: string;
  creditType?: ECreditType;
  serviceRate?: number;
  cartCost?: number;
  insuranceCost?: number;
  valuationCost?: number;
  monthlyPayment?: number;
  amountToBePaid?: number;
  creditPurpose?: string;
  annualPercent?: number;
  otherPayment?: number;
  notarialCost?: string;
  insuranceType?: string;
  guarantee?: 'NONE' | 'ZAMIN' | 'GIROV';
  spouses?: Spouse[];
  fine?: string;
  simaContractOperationId?: string;
  contractFileName?: string;
  videoSignFileName?: string;
  decisionQueryEnabled?: boolean;
  videoSignText?: string;
  partner?: Partner;
  guarantors?: Guarantor[];
  recruiter?: RecruiterDataType;
  cashPrice?: number;
  operationType?: string;
  productName?: string;
  // BU SATIRIN ÜST KISMI YUKARDA GÖNDERDİĞİNİZLE BİREBİR AYNI
  // ALT KISMINI BEN EKLEDİM DİĞER TABLARDAKI INPUTLAR IÇİN İÇİN 
  creditDetails: {
    storeName?: string;
    operationType?: 'product' | 'service' | string;
    productName?: string;
    creditTerm?: number;
    cashPrice?: number;
    creditAmount?: number;
    category?: string;
    detail?: string;
    creditAmountInput?: number | null;
    annualPercent?: number | null;
    monthlyPayment?: number | null;
    totalPayment?: number | null;
    cardCost?: number | null;
    valuationCost?: number | null;
    insuranceCost?: number | null;
    creditPurpose?: string;
    decisionQueryEnabled?: boolean;
    serviceRate?: number;
  };
  workExperience: string;
  familyMembers: string;
  familyIncome: string;
  isRenting: boolean;
  rentAmount: string;
  rentDuration: string;
  actualAddress: string;
  additionalIncomes: AdditionalIncome[];
  idQuality: number;
  generalNote: string;
  relatedPersons: Person[];
  pensioner: {
    name: string;
    patronymic: string;
    birthDate: string;
    surname: string;
    allowance: Array<{
      beginDate: string;
      type: {
        id: number;
        description: string;
      };
      group: {
        id: number;
        description: string;
      };
      amount: number;
      endDate: string;
    }>;
    pension: Array<{
      type: {
        label: string;
        id: number;
        description: string;
      };
      group: {
        id: number;
        description: string;
      };
      amount: number;
      startDate: string;
      endDate: string;
    }>;
  };
  creditOrderNo?: number;
  creditYear?: number;
}

export interface User {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  username?: string;
  name?: string;
  surname?: string;
  fullName?: string;
  fatherName?: string;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  pin?: string;
  seriaNo?: string;
  eventDate?: Date;
  expDate?: Date;
  address?: string;
  organisationName?: string;
  activationDate?: Date;
  birthAddress?: string;
  nationality?: string;
  maritalStatus?: string;
  factAddress?: string;
  countOfChildren?: number;
  education?: string;
  workPlace?: string;
  workAddress?: string;
  position?: string;
  experience?: number;
  salary?: number;
  otherIncome?: number;
  voen?: string;
  formOfOwnership?: string;
  password?: string;
  lastLoginDate?: Date;
  loggedIn?: boolean;
  partners?: Partner[];
  roles?: Role[];
  tokens?: Token[];
  birthDate?: Date;
  status?: string;
  signUpDate?: Date;
  photo?: string;
  departmentId?: string;
}

export enum ActivityType {
  IT = 'IT',
  MARKETING = 'MARKETING',
  FINANCE = 'FINANCE',
  SALES = 'SALES',
  HR = 'HR',
  LOGISTICS = 'LOGISTICS',
  OTHER = 'OTHER',
}

export enum EOwnerType {
  HUQUQI = 'HUQUQI',
  FIZIKI = 'FIZIKI',
}

export enum EStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  NEW = 'NEW',
}

export interface Partner {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  identityCard: string;
  phoneNumber?: string;
  companyName?: string;
  businessName?: string;
  directorName?: string;
  voen?: string;
  pin?: string;
  image?: string;
  url?: string;
  monthlySales?: number;
  activityType?: ActivityType;
  formOfOwnership?: EOwnerType;
  companyImages?: string[];
  city?: string;
  address?: string;
  status: EStatus;
}

export interface Role {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  name?: string;
}

export interface Token {
  id?: string;
  token?: string;
  tokenType?: string;
  revoked?: boolean;
  expired?: boolean;
  user?: string;
}

export interface OtherPhoneNumbers {
  Ev: string;
  Is: string;
  GSM: string;
}

export interface Spouse {
  fullName?: string;
  serialNumber?: string;
  eventDate?: string;
  organisationName?: string;
  birthAddress?: string;
  nationality?: string;
  address?: string;
  factAddress?: string;
  phoneNumbers?: string;
  workPlace?: string;
  workAddress?: string;
  position?: string;
}

export interface CreditRequestSearchDto {
  creditType?: ECreditType;
  search?: string;
  pageSize: number;
  page: number;
}
