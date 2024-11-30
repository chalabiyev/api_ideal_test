import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { fIsAfter } from 'src/utils/format-time';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type FormSchemaType = zod.infer<typeof FormSchema>;

export const FormSchema = zod
  .object({
    fullName: zod
      .string()
      .min(1, { message: 'Full name is required!' })
      .min(6, { message: 'Mininum 6 characters!' })
      .max(32, { message: 'Maximum 32 characters!' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required!' })
      .email({ message: 'Email must be a valid email address!' }),
    phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
    editor: schemaHelper
      .editor()
      .min(100, { message: 'Content must be at least 100 characters' })
      .max(200, { message: 'Content must be less than 200 characters' }),
    age: zod
      .number()
      .min(1, { message: 'Age is required!' })
      .min(18, { message: 'Age must be between 18 and 100' })
      .max(100, { message: 'Age must be between 18 and 100' }),
    startDate: schemaHelper.date({ message: { required_error: 'Start date is required!' } }),
    endDate: schemaHelper.date({ message: { required_error: 'End date is required!' } }),
    password: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'Password is too short!' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
    autocomplete: schemaHelper.objectOrNull<{
      value: string;
      label: string;
    } | null>({ message: { required_error: 'Autocomplete is required!' } }),
    singleCountry: schemaHelper.objectOrNull({
      message: { required_error: 'Single country is required!' },
    }),
    multiCountry: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
    //
    singleSelect: zod.string().min(1, { message: 'Single select is required!' }),
    multiSelect: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
    //
    rating: zod.number().min(1, { message: 'Rating is required!' }),
    radioGroup: zod.string().min(1, { message: 'Choose at least one option!' }),
    //
    checkbox: schemaHelper.boolean({ message: { required_error: 'Checkbox is required!' } }),
    switch: schemaHelper.boolean({ message: { required_error: 'Switch is required!' } }),
    //
    multiCheckbox: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
    multiSwitch: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
    //
    slider: zod.number().min(10, { message: 'Mininum value is >= 10' }),
    sliderRange: zod
      .number()
      .array()
      .refine((data) => data[0] >= 20 && data[1] <= 80, {
        message: 'Range must be between 20 and 80',
      }),
    //
    singleUpload: schemaHelper.file({ message: { required_error: 'Single upload is required!' } }),
    multiUpload: schemaHelper.files({ message: { required_error: 'Multi upload is required!' } }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  })
  .refine((data) => !fIsAfter(data.startDate, data.endDate), {
    message: 'End date cannot be earlier than start date!',
    path: ['endDate'],
  });

  export const creditSchema = zod
  .object({
    fin: zod
      .string()
      .min(7, { message: 'Fin 7 simvoldan az ola bilməz!' })
      .max(7, { message: 'Fini 7 simvoldan çox ola bilməz!' }),
    serialNumber: zod
      .string()
      .max(11, { message: 'Ş/V seriyası 11 simvoldan çox ola bilməz!' })
      .min(9, {
        message: 'Ş/V seriyası və nömrəsi 9 simvoldan az ola bilməz!',
      }),
    passportStatus: zod.string().min(1, { message: 'Vəsiqənin statusu tələb olunur!' }),
    name: zod.string().min(1, { message: 'Ad tələb olunur!' }),
    surname: zod.string().min(1, { message: 'Soyad tələb olunur!' }),
    fatherName: zod.string().min(1, { message: 'Ata adı tələb olunur!' }),
    born: zod.string().min(1, { message: 'Doğum tarixi tələb olunur!' }),
    familyRelationship: zod.string().min(1, { message: 'Ailə vəziyyəti tələb olunur!' }),
    gender: zod.string().min(1, { message: 'Cinsiyyət tələb olunur!' }),
    state: zod.string().min(1, { message: 'Doğum yeri tələb olunur!' }),
    zipCode: zod.string().min(1, { message: 'Zip kodu tələb olunur!' }),
    role: zod.string().min(1, { message: 'Rol tələb olunur!' }),
    email: zod
      .string()
      .min(1, { message: 'Email tələb olunur!' })
      .email({ message: 'Email Adresini düzgün daxil edin!' }),
    phoneNumber: zod.string().min(1, { message: 'Telefon nömrəsi tələb olunur!' }),
    address: zod.string().min(1, { message: 'Yaşayış yeri tələb olunur!' }),
    country: zod.string().min(1, { message: 'Ölkə tələb olunur!' }),
    status: zod.string(),
    reportNum: zod.string().min(1, { message: 'Hesabat nömrəsi tələb olunur!' }),
    dateMade: zod.string().min(1, { message: 'Hesabatın yaradıldığı tarix tələb olunur!' }),
    historyMadeDate: zod.string().min(1, { message: 'Tarixçənin açıldığı tarix tələb olunur!' }),
    loanerId: zod.string().min(1, { message: 'Borcalanın ID-si tələb olunur!' }),
    loanerScore: zod.number().min(1, { message: 'Borcalanın skoru tələb olunur!' }),
    loanerAdd: zod.string().min(1, { message: 'Borcalanın ünvanı tələb olunur!' }),
    loanerBornAdd: zod.string().min(1, { message: 'Borcalanın doğum yeri tələb olunur!' }),
    loanerBornDate: zod.string().min(1, { message: 'Borcalanın doğum tarixi tələb olunur!' }),
    education: zod.string().min(1, { message: 'Təhsil tələb olunur!' }),
    workplaceName: zod.string().min(1, { message: 'İş yeri adı tələb olunur!' }),
    workplaceAddress: zod.string().min(1, { message: 'İş yeri ünvanı tələb olunur!' }),
    positionAndExperience: zod.string().min(1, { message: 'Vəzifə və təcrübə tələb olunur!' }),
    monthlySalary: zod.string().min(1, { message: 'Aylıq maaş tələb olunur!' }),
    totalMonthlyIncome: zod.string().min(1, { message: 'Cəmi aylıq gəlir tələb olunur!' }),
    totalExpenses: zod.string().min(1, { message: 'Cəmi xərclər tələb olunur!' }),
    netIncome: zod.string().min(1, { message: 'Net gəlir tələb olunur!' }),
    contractStartDate: zod.string().min(1, { message: 'Müqavilənin başlama tarixi tələb olunur!' }),
    contractEndDate: zod.string().min(1, { message: 'Müqavilənin bitmə tarixi tələb olunur!' }),
    monthlySalaryAmount: zod.string().min(1, { message: 'Aylıq maaş məbləği tələb olunur!' }),
    akbInfo: zod.string().min(1, { message: 'AKB məlumatı tələb olunur!' }),
    internalRiskSystem: zod.string().min(1, { message: 'Daxili risk sistemi tələb olunur!' }),
    propertyType: zod.string().min(1, { message: 'Əmlak növü tələb olunur!' }),
    registrationNumber: zod.string().min(1, { message: 'Qeydiyyat nömrəsi tələb olunur!' }),
    occupancyAddress: zod.string().min(1, { message: 'Ünvanı tələb olunur!' }),
    ownershipStatus: zod.string().min(1, { message: 'Sahiblik statusu tələb olunur!' }),
    numberOfRooms: zod.string().min(1, { message: 'Otaq sayı tələb olunur!' }),
    area: zod.string().min(1, { message: 'Sahə tələb olunur!' }),
    constructionYear: zod.string().min(1, { message: 'İnşa tarixi tələb olunur!' }),
    marketValue: zod.string().min(1, { message: 'Bazar dəyəri tələb olunur!' }),
    mortgageStatus: zod.string().min(1, { message: 'İpoteka statusu tələb olunur!' }),
    monthlyRent: zod.string().min(1, { message: 'Aylıq icarə məbləği tələb olunur!' }),
    avatarUrl: zod.string(),
    vehicleData: zod
      .object({
        vehicleBrand: zod.string().min(1, { message: 'Marka tələb olunur!' }),
        vehicleModel: zod.string().min(1, { message: 'Model tələb olunur!' }),
        vehicleYear: zod.string().min(1, { message: 'İl tələb olunur!' }),
        vehicleMarketValue: zod.string().min(1, { message: 'Bazar dəyəri tələb olunur!' }),
        vehicleVin: zod.string().min(1, { message: 'VIN nömrəsi tələb olunur!' }),
        vehicleNumber: zod.string().min(1, { message: 'Nömrə tələb olunur!' }),
      })
      .optional(),
    zaminData: zod
      .object({
        name: zod.string().min(1, { message: 'Ad tələb olunur!' }),
        surname: zod.string().min(1, { message: 'Soyad tələb olunur!' }),
        fin: zod.string().min(1, { message: 'Fin tələb olunur!' }),
        serialNumber: zod.string().min(1, { message: 'Ş/V seriyası tələb olunur!' }),
        passportStatus: zod.string().min(1, { message: 'Vəsiqənin statusu tələb olunur!' }),
        identityCard: zod.string().min(1, { message: 'Ş/V nömrəsi tələb olunur!' }),
        issuedBy: zod.string().min(1, { message: 'Verən orqan tələb olunur!' }),
        borrowerInfo: zod.string().min(1, { message: 'Borcalanın məlumatı tələb olunur!' }),
        registrationAddress: zod.string().min(1, { message: 'Qeydiyyat ünvanı tələb olunur!' }),
        residentialAddress: zod.string().min(1, { message: 'Yaşayış ünvanı tələb olunur!' }),
        phones: zod.string().min(1, { message: 'Telefon nömrəsi tələb olunur!' }),
        newZaminName: zod.string().min(1, { message: 'Ad tələb olunur!' }),
        newZaminSurname: zod.string().min(1, { message: 'Soyad tələb olunur!' }),
        newZaminFin: zod.string().min(1, { message: 'Fin tələb olunur!' }),
        newZaminSerialNumber: zod.string().min(1, { message: 'Ş/V seriyası tələb olunur!' }),
        newZaminPassportStatus: zod.string().min(1, { message: 'Vəsiqənin statusu tələb olunur!' }),
        newZaminIdentityCard: zod.string().min(1, { message: 'Ş/V nömrəsi tələb olunur!' }),
        newZaminIssuedBy: zod.string().min(1, { message: 'Verən orqan tələb olunur!' }),
        newZaminRegistrationAddress: zod
          .string()
          .min(1, { message: 'Qeydiyyat ünvanı tələb olunur!' }),
        newZaminResidentialAddress: zod
          .string()
          .min(1, { message: 'Yaşayış ünvanı tələb olunur!' }),
        newZaminPhones: zod.string().min(1, { message: 'Telefon nömrəsi tələb olunur!' }),
      })
      .optional(),
    loanTotal: zod.number().min(1, { message: 'Kredit məbləği boş buraxıla bilməz!' }),
    loanPercentagePerYear: zod
      .number()
      .min(1, { message: 'İllik faiz dərəcəsi boş buraxıla bilməz!' }),
    payPerMonth: zod.number().min(1, { message: 'Aylıq ödəniş məbləği boş buraxıla bilməz!' }),
    totalCredit: zod.number().min(1, { message: 'Cəmi kredit məbləği boş buraxıla bilməz!' }),
    totalPercetange: zod.number().min(1, { message: 'Cəmi faiz dərəcəsi boş buraxıla bilməz!' }),
    comissionDecide: zod.boolean(),
    whereToGetSignature: zod
      .string()
      .min(1, { message: 'Müqavilənin əldə ediləcəyi vasitə(lər) tələb olunur!' }),
    telegramUsernameToGet: zod
      .string()
      .min(1, { message: 'Telegram istifadəçi adı tələb olunur!' }),
    whatsappNumberToGet: zod.string().min(1, { message: 'WhatsApp nömrəsi tələb olunur!' }),
    emailToGet: zod.string().min(1, { message: 'Email tələb olunur!' }),
  })
  .refine((data) => data.telegramUsernameToGet || data.whatsappNumberToGet || data.emailToGet, {
    message: 'At least one of Telegram Username, WhatsApp Number, or Email is required!',
    path: ['telegramUsernameToGet', 'whatsappNumberToGet', 'emailToGet'],
  });