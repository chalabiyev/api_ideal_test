export type RecruiterDataType = {
  education: string;
  companyName: string;
  salary: number;
  address: string;
  position: string;
  workExperience: number;
  contractStartDate: string;
  contractEndDate: string;
  toplamodenis: number;
  akbmelumatlari: string;
  daxilirisk: string;
  ayliqemekhaqqi: number;
  ayliqcemigelir: number;
  xerclerincemi: number;
  xalisgelir: number;
};

export interface Guarantor {
  personAz: {
    name: string;
    surname: string;
    patronymic: string;
  };
  id: number;
  pin: string;
  documentNumber: string;
  image: string;
  addressDetail: { address: string };
  birthDate: string;
  birthAddress: string;
  maritalStatus: string;
  militaryStatus: string;
  gender: string;
  isActive: boolean;
  relation: string;
  phoneNumber?: string;
  workPlace?: string;
  position?: string;
}

//  --------------------------------- requritment ---------------------------------

export type Type = {
  label: string;
  id: number;
  type: string;
  description: string;
};

export type Employer = {
  legalAddress?: string;
  workerCount?: number;
  name: string;
  propertyType?: Type;
  voen: string;
  phone?: string;
};

export type Employee = {
  positionLabourContract?: string;
  workCasualType?: Type;
  ssn?: string;
  workPlaceType?: Type;
  name?: string;
  position: string;
  patronymic?: string;
  salary: number;
  surname?: string;
  phone?: string;
  workPlace?: string;
};

export type Contract = {
  number?: string;
  insertDate?: string;
  nextEndDate?: string;
  terminateDate?: string;
  periodType?: Type;
  invalidation?: Type;
  beginDate: string;
  signDate?: string;
  status?: Type;
  endDate: string;
};

export type Job = {
  Employee: Employee;
  Employer: Employer;
  Contract: Contract;
};

export type EmployeeInfoResponse = {
  Active: Job[];
  Deactive: Job[];
};

//  --------------------------------- pensioner ---------------------------------
export type PensionerInfoResponse = {
  allowance: Pension[];
  pension: Pension[];
  name: string;
  patronymic: string;
  birthDate: string;
  surname: string;
};

export type Pension = {
  beginDate?: string;
  type: MultiType;
  group: MultiType;
  amount: number;
  startDate?: string;
  endDate: string;
};

export type MultiType = {
  label?: string;
  id: number;
  description: string;
};

// ------------------- akb ---------------------

interface Borrower {
  documentNo: string;
  name: string;
  fin: string;
  dateOfBirth: string; // ISO tarih formatı olarak
  placeOfBirth: string;
  personType: string;
  fileDate: string; // ISO tarih formatı olarak
  locationCity: string;
  registeredAddress: string;
  status: string;
  participantOfPatrioticWar: boolean;
}

interface HistoryItem {
  overdueDays: number | null;
  reportingPeriod: string | null;
  creditStatus: string | null;
}

interface Liability {
  id: string;
  bankId: string;
  bankName: string;
  accountNo: string;
  creditType: string;
  orgIDType: string;
  grantedOn: string; // ISO tarih formatı olarak
  initialAmount: number;
  lineAmount: number;
  daysInterestOverdue: number;
  daysMainSumOverdue: number;
  contractDueOn: string; // ISO tarih formatı olarak
  interestRate: number;
  lastUpdatedDate: string; // ISO tarih formatı olarak
  lastPaymentDate: string; // ISO tarih formatı olarak
  outstandingDebtMain: number;
  outstandingDebtInterest: number;
  monthlyPaymentAmount: number;
  prolongations: number;
  creditStatus: string;
  creditStatusCloseDate: string; // ISO tarih formatı olarak
  creditPurpose: string;
  currency: string;
  mkrId: string;
  collateralCode: string;
  collateralRegistryAgency: string;
  collateralRegistryNo: string;
  collateralAnyInfo: string;
  history: HistoryItem[];
}

interface InquiryHistoryItem {
  inqOrgIDType: string;
  inqBankId: string;
  inqBankName: string;
  inqDate: string; // ISO tarih formatı olarak
  inqPurposeId: string;
}

interface Score {
  calculated: boolean;
}

export interface Report {
  id: string;
  reportingDate: string; // ISO tarih formatı olarak
  borrower: Borrower;
  liabilities: Liability[];
  inquiryHistory: InquiryHistoryItem[];
  score: Score;
  balance: number;
}

export interface AKBBorrowerScoreResponse {
  id?: string;
  reportId?: string;
  response?: string;
  point?: number;
  pdRate?: number;
}