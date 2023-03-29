import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_NEW_FOR_USER, USER_NEW_ORDER } from '../shared/constants/url';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  // User new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(USER_NEW_ORDER, order);
  }
  // -----------------------------------------------------------------------

  // Get order for current user
  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_USER);
  }
  // -----------------------------------------------------------------------
}
