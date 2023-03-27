import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FOODS_URL, FOODS_URL_BY_ID } from '../shared/constants/url';
import { Food } from '../shared/models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  foods: Food[] = [];

  constructor(private http: HttpClient) {}

  foodsChanged = new Subject<Food[]>();

  fetchAllFoodProducts(): Observable<Food[]> {
    // return this.foods.slice();
    return this.http.get<Food[]>(FOODS_URL);
  }

  getProductById(id: string): Observable<Food> {
    return this.http.get<Food>(FOODS_URL_BY_ID + id);
  }

  searchFoodProduct(product: string) {}
}
