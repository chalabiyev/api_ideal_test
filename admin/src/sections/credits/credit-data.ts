

export const sorguTarixcesi = [
  {
    bankName: 'Bank 1',
    date: '2023-12-12',
    purpose: 'Kredit Müraciəti',
  },
  {
    bankName: 'Bank 2',
    date: '2022-11-02',
    purpose: 'Kredit Müraciəti',
  },
];

export const loanData = {
  dataProvider: 'XXX',
  KIN: 'ZZ42VZ3A0M',
  accountNumber: '*****',
  totalAmount: 47521.55,
  monthlyPayment: 386,
  lastPaymentDate: '05.03.2018',
  loanPurpose: 'Fiziki şəxslərə ipoteka kreditləri',
  overdueDaysMainDebt: 0,
  interestAmount: 170.99,
  issuanceDate: '14.01.2014',
  initialContractEndDate: '31.12.2039',
  lastContractEndDate: '31.12.2039',
  overdueDaysInterest: 0,
  collateralType: 'Daşınmaz əmlak',
  collateralValue: 90000,
  collateralDescription: 'Bakı şəhəri / Nəsimi rayonunda iki otaqlı mənzil',
  registrationAuthority: 'DƏDYDR xidməti',
  registrationDate: '14.01.2014',
};

export const oldLoanData = {
  totalAmount: '1 500 AZN',
  KIN: 'ZZ42VZ3A0M',
  dataProvider: 'XXX',
  accountNumber: '*****',
  monthlyPayment: 386,
  lastPaymentDate: '05.03.2012',
  loanPurpose: 'Fiziki şəxslərə istehlak kreditləri',
  overdueDaysMainDebt: 0,
  issuanceDate: '14.01.2014',
  initialContractEndDate: '31.12.2034',
  lastContractEndDate: '31.12.2034',
  overdueDaysInterest: 0,
};

export const guarantorLoanData = {
  totalAmount: '2 500 AZN',
  KIN: 'ZZ42VZ3A0M',
  dataProvider: 'XXX',
  accountNumber: '*****',
  monthlyPayment: 386,
  lastPaymentDate: '05.03.2012',
  loanPurpose: 'Fiziki şəxslərə istehlak kreditləri',
  overdueDaysMainDebt: 0,
  issuanceDate: '14.01.2014',
  initialContractEndDate: '31.12.2034',
  lastContractEndDate: '31.12.2034',
  overdueDaysInterest: 0,
};

export const zaminData = [
  {
    id: '1',
    name: 'John Doe',
    fin: '123456789',
    serialNumber: 'AA123456',
    passportStatus: 'aktiv',
    identityCard: '123456789',
    issuedBy: 'Lənkəran Rayon Polis İdarəsi',
    fullName: 'Rasim Vəliyev',
    borrowerInfo: 'Some info about borrower',
    registrationAddress: 'Bakı şəhəri, Yasamal rayonu, 28 may küçəsi',
    residentialAddress: 'Bakı şəhəri, Yasamal rayonu, 28 may küçəsi',
    phones: '123-456-7890',
    avatarUrl:
      'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'John Doe 2',
    fin: '12345678',
    serialNumber: 'AA12345',
    passportStatus: 'aktiv',
    identityCard: '12345678',
    issuedBy: 'Yasamal Rayon Polis İdarəsi',
    fullName: 'Rasim Vəliyev',
    borrowerInfo: 'Some info about borrower',
    registrationAddress: 'Bakı şəhəri, Yasamal rayonu, 28 may küçəsi',
    residentialAddress: 'Bakı şəhəri, Yasamal rayonu, 28 may küçəsi',
    phones: '123-456-7890',
    avatarUrl:
      'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const paymentHistory = [
  {
    title: 'Aktiv kreditlərin cəmi qalıq məbləği',
    amount: '1 894.07',
    creditCount: '2',
    creditCompanyCount: '2',
  },
  {
    title: 'Kreditlər üzrə qalıq məbləğ',
    amount: '632',
    creditCount: '0',
    creditCompanyCount: '2',
  },
  {
    title: ' Kredit xətləri üzrə qalıq məbləğ',
    amount: '1 894.07',
    creditCount: '2',
    creditCompanyCount: '2',
  },
  {
    title: 'Qarantiya üzrə qalıq məbləğ',
    amount: '1 894.07',
    creditCount: '2',
    creditCompanyCount: '2',
  },
  {
    title: 'Cəmi aylıq ödəniş məbləği',
    amount: '1 894.07',
    creditCount: '2',
    creditCompanyCount: '2',
  },
  {
    title: 'Tam ödənilmiş kreditlərin cəmi məbləği',
    amount: '1 894.07',
    creditCount: '2',
    creditCompanyCount: '2',
  },
  {
    title: 'Zamin olduğu öhdəliyin məbləği',
    amount: '1 894.07',
    creditCount: '2',
    creditCompanyCount: '2',
  },
];

// export const tabledata = {
//   2024: ['01', '02', '03', '04', '05', '06', '07', '08'],
//   2023: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'],
//   2022: ['12', '11'],
// };

// export const values: ValuesType = {
//   2024: { '01': 10, '02': 20, '03': 30, '04': 40, '05': 50, '06': 60, '07': 70, '08': 80 },
//   2023: {
//     '12': 90,
//     '11': 100,
//     '10': 110,
//     '09': 120,
//     '08': 130,
//     '07': 140,
//     '06': 150,
//     '05': 160,
//     '04': 170,
//     '03': 180,
//     '02': 190,
//     '01': 200,
//   },
//   2022: { '12': 210, '11': 220 },
// };


export const creditData = [
  0,
  '-',
  0,
  30,
  90,
  180,
  0,
  361,
  0,
  '-',
  180,
  30,
  0,
  30,
  0,
  '-',
  90,
  361,
  0,
  30,
  '-',
  180,
  90,
  0,
];

export const familyData = [
  {
    id: '1',
    title: 'Ata',
    fields: {
      avatarUrl:
        'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      fin: '123456789',
      serialNumber: '132456789',
      passportStatus: 'Active',
      name: 'TestFather',
      surname: 'TestFather',
      fatherName: 'TestFather',
      born: '11.10.2001',
      familyRelationship: 'Married',
      gender: 'Men',
      address: 'Baki azerbaycan',
    },
  },
  {
    id: '2',
    title: 'Ana',
    fields: {
      avatarUrl:
        'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      fin: '123456789',
      serialNumber: '132456789',
      passportStatus: 'Active',
      name: 'TestFather',
      surname: 'TestFather',
      fatherName: 'TestFather',
      born: '11.10.2001',
      familyRelationship: 'Married',
      gender: 'Women',
      address: 'Baki azerbaycan',
    },
  },
];

export const combinedHeaders = [
  { label: '04/2024' },
  { label: '03/2024' },
  { label: '02/2024' },
  { label: '01/2024' },
  { label: '12/2023' },
  { label: '11/2023' },
  { label: '10/2023' },
  { label: '09/2023' },
  { label: '08/2023' },
  { label: '07/2023' },
  { label: '06/2023' },
  { label: '05/2023' },
  { label: '04/2023' },
  { label: '03/2023' },
  { label: '02/2023' },
  { label: '01/2023' },
  { label: '12/2022' },
  { label: '11/2022' },
  { label: '10/2022' },
  { label: '09/2022' },
  { label: '08/2022' },
  { label: '07/2022' },
  { label: '06/2022' },
  { label: '05/2022' },
];

export const _customerRole = [
  { value: 'customer', label: 'Müştəri' },
  { value: 'guarantor', label: 'Zamin' },
  { value: 'employee', label: 'Əməkdaş' },
];
