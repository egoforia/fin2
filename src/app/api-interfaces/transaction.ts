import { Category } from "./category";

export class Transaction {
  id?: number;
  amount: number;
  date: Date | string;
  category_id: number;
  categories?: Category;
}

export interface ReportAvgSum {
  average: number;
  total: number;
}

export interface ReportSumByCategory {
  total: number;
  categories_id: number;
  categories_name: string;
  categories_emoji: string;
}