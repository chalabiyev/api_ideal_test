import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IChannelFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

export type IChannelTableFilters = {
  stock: string[];
  publish: string[];
};

export type IChannelReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IChannelReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  postedAt: IDateValue;
  isPurchased: boolean;
  attachments?: string[];
};

export type IChannelItem = {
  time: string;
  percentage: number;
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  sizes: string[];
  publish: string;
  gender: string[];
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  createdAt: IDateValue;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IChannelReview[];
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};
