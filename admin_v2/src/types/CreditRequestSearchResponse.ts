import { CreditRequest } from "./CreditRequest";

export interface CreditRequestSearchResponse {
  numberOfElements: number;
  content: CreditRequest[];
  totalPages: number;
  totalElements: number;
}