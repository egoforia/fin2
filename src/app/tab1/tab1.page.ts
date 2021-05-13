import { Component, OnInit } from '@angular/core';
import { Category } from '../api-interfaces/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private categoriesService: CategoriesService
  ) {}

  categories: Promise<Category[]>;

  ngOnInit() {
    this.categories = this.categoriesService.all();
  }

}
