import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cart: Cart;
  cartSub: Subscription;
  currentUser: User;
  currentUserSub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    this.currentUserSub = this.authService.userObservable.subscribe((user) => {
      this.currentUser = user;
      this.isAuthenticated = user.token ? true : false;
    });
  }

  onLogout(): void {
    this.authService.userLogout();

    this.cartService.clearCart();
  }
}
