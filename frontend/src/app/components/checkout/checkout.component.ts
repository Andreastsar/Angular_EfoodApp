import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  currentUser: User;
  cart: Cart;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.cart = this.cartService.getCart();
  }

  onCreateOrder() {
    const order = new Order();
    const { items, totalPrice } = this.cart;
    const { name, address } = this.currentUser;
    order.items = items;
    order.totalPrice = totalPrice;
    order.name = name;
    order.address = address;
    console.log(order);
  }
}
