import { Category } from "./category";

export class Transaction {
  id?: number;
  amount: number;
  date: Date | string;
  category_id: number;
  categories?: Category;
}
