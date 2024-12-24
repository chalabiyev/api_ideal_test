export type RecruiterDataType = {
  education: string;
  companyName: string;
  salary: string;
  address: string;
  position: string;
  workExperience: string;
  contractStartDate: string;
  contractEndDate: string;
  toplamodenis: string;
  akbmelumatlari: string;
  daxilirisk: string;
  //   ------
  ayliqemekhaqqi: string;
  ayliqcemigelir: string;
  xerclerincemi: string;
  xalisgelir: string;
};

export interface Zamin {
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
}
