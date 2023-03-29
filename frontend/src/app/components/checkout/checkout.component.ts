import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
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
    private authService: AuthService,
    private orderService: OrdersService,
    private router: Router,
    private toastrService: ToastrService
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

    // console.log(order);
    this.orderService.createOrder(order).subscribe((result) => {
      this.router.navigate(['/payment']);
    });
  }
}
