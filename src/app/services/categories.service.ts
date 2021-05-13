import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../api-interfaces/category';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private sbService: SupabaseService
  ) { }

  async all(): Promise<Category[]> {
    const { data, error } = await this.sbService.client.from('categories').select();

    if (data) {
      return data;
    } else {
      throw error;
    }
  }
}
