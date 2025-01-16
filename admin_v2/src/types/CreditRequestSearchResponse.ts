import { CreditRequest } from "./CreditRequestDto";

export interface CreditRequestSearchResponse {
  numberOfElements: number;
  content: CreditRequest[];
  totalPages: number;
  totalElements: number;
}