import {
  RecruiterDataType,
  Guarantor,
  EmployeeInfoResponse,
  PensionerInfoResponse,
} from 'src/pages/dashboard/VideoMuraciet/types';

export type ECreditType =
  | 'ABOVE_500'
  | 'BELOW_500'
  | 'PARTNER_CREDIT'
  | 'BUSINESS_CREDIT'
  | undefined
  | '';

export type EFinalStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | undefined;

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
  connectedWithBOKT?: boolean;
  contractFileName?: string;
  videoSignFileName?: string;
  decisionQueryEnabled?: boolean;
  videoSignText?: string;
  partner?: Partner;
  guarantors?: Guarantor[];
  recruiter?: RecruiterDataType;
}

export interface CreditRequestDto {
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
  requestedUserPin?: string;
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
  connectedWithBOKT?: boolean;
  contractFileName?: string;
  videoSignFileName?: string;
  decisionQueryEnabled?: boolean;
  videoSignText?: string;
  guarantors: Guarantor[];
  recruiter: EmployeeInfoResponse;
  pensioner: PensionerInfoResponse;
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
