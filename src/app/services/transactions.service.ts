import { Injectable } from '@angular/core';
import { Transaction } from '../api-interfaces/transaction';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private sbService: SupabaseService
  ) { }

  async all(): Promise<Transaction[]> {
    const { data, error } = await this.sbService.client
      .from('transactions')
      .select('*');

    if (data) { return data; } 
    else { throw error; }
  }

  async getByDate(date: string): Promise<Transaction[]> {
    const { data, error } = await this.sbService.client
      .from('transactions')
      .select('*, categories(*)')
      .eq('date', date);

    if (data) { return data; } 
    else { throw error; }
  }

  async insert(transactions: Transaction[]): Promise<Transaction[]> {
    const { data, error } = await this.sbService.client
      .from('transactions')
      .insert(transactions);

    if (data) { return data; } 
    else { throw error; }
  }

  async upsert(transactions: Transaction[]): Promise<Transaction[]> {
    const { data, error } = await this.sbService.client
      .from('transactions')
      .upsert(transactions);

    if (data) { return data; } 
    else { throw error; }
  }
}
