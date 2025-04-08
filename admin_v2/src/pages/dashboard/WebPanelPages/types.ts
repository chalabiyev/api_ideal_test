export interface CreditFormData {
  id?: string;
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
    minAmount: string;
    maxAmount: string;
    minPeriod: string;
    maxPeriod: string;
    minRate: string;
    maxRate: string;
    minFIFD: string;
    maxFIFD: string;
    currency: string;
    commissionRate: string;
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
  id?: string;
  insuranceType: EInsuranceType;
  image: string;
  title: string;
  description: string;
}
export enum EInsuranceType {
  INDIVIDUAL = 'INDIVIDUAL',
  COOPERATIVE = 'COOPERATIVE',
}

// campaign
export interface CampaignFormData {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  id?: string;
  subscriptionMailSent?: boolean;
  title: string;
  description: string;
  image: string;
  showOnMainPage: boolean;
}

// contact
export interface ContactInfoFormData {
  phoneNumber: string;
  insurancePhoneNumber: string;
  email: string;
  locationUrl: string;
  location: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
    telegram: string;
    whatsapp: string;
  };
  businessHours: [
    {
      day: string;
      openTime: string;
      closeTime: string;
    },
    {
      day: string;
      openTime: string;
      closeTime: string;
    },
  ];
}

// subcribe lise
export interface SubscribersListI {
  createdBy: string;
  updatedBy: string;
  createdDate: Date;
  updatedDate: Date;
  id: string;
  email: string;
  subscribedAt: Date;
  active: true;
}

// slider
export interface SliderListI {
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  id?: string;
  title: string;
  subTitle: string;
  link: string;
  image: string;
}

// aboutus
export interface AboutUsI {
  title: string;
  description: string;
  appleStoreLink: string;
  googlePlayLink: string;
}

// info
export interface InfoI {
  id?: string;
  title: string;
  description: string;
  image: string;
}
