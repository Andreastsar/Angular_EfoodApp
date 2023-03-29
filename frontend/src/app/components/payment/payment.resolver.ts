import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/shared/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentResolver implements Resolve<Order> {
  constructor(private ordersService: OrdersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order> | Promise<Order> | Order {
    return this.ordersService.getNewOrderForCurrentUser();
  }
}
