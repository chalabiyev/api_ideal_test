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
    confirmStatus?: string;
    activateStatus?: string;
    finalStatus?: string;
    requestedUserPin?: string;    
    confirmDate?: Date;
    confirmerComment?: string;
    creditType?: string;
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
    guarantee?: string;
    spouses?: Spouse[];
    fine?: string;
    simaContractOperationId?: string;
    connectedWithBOKT?: boolean;
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
}

export interface Partner {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  phoneNumber?: string;
  companyName?: string;
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
  status?: EStatus;
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
    additionalProp1?: string;
    additionalProp2?: string;
    additionalProp3?: string;
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
