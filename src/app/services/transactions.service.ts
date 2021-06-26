import { Injectable } from '@angular/core';
import { ReportAvgSum, ReportSumByCategory, Transaction } from '../api-interfaces/transaction';
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

  async report_avg_sum(start_date: string, end_date: string): Promise<ReportAvgSum> {
    const { data, error } = await this.sbService.client
      .rpc('transactions_avg_sum', { start_date, end_date })

    if (data) { return data[0]; } 
    else { throw error; }
  }

  async report_sum_by_categories(start_date: string, end_date: string): Promise<ReportSumByCategory[]> {
    const { data, error } = await this.sbService.client
      .rpc('transactions_sum_by_categories', { start_date, end_date })

    if (data) { return data; } 
    else { throw error; }
  }
}
