import { Category } from "./category";

export class Transaction {
  id?: number;
  amount: number;
  date: Date;
  category_id: number;
  category?: Category;
}