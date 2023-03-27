import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food.model';

@Injectable()
export class FoodListResolver implements Resolve<Food[]> {
  constructor(private foodService: FoodService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Food[]> | Promise<Food[]> | Food[] {
    return this.foodService.fetchAllFoodProducts();
  }
}
