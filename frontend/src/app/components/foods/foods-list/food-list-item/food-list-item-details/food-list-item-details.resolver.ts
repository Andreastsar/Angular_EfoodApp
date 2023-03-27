import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food.model';

@Injectable()
export class FoodItemResolver implements Resolve<Food> {
  constructor(private foodService: FoodService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Food> | Promise<Food> | Food {
    const id = route.params['id'];

    return this.foodService.getProductById(id);
  }
}
