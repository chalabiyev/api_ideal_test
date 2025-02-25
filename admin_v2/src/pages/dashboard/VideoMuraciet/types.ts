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
  employee: Employee;
  employer: Employer;
  contract: Contract;
};

export type EmployeeInfoResponse = {
  active: Job[];
  deactive: Job[];
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
