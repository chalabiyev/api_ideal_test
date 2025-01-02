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
