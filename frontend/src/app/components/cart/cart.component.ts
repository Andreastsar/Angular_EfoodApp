import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;
  cartSub: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  onIncreaseQuantity(foodId: string): void {
    this.cartService.increaseQuantity(foodId);
  }

  onDecreaseQuantity(foodId: string): void {
    this.cartService.decreaseQuantity(foodId);
  }

  onRemoveICartItem(foodId: string): void {
    this.cartService.removeFoodItemFromCart(foodId);
  }

  onClearCart(): void {
    window.confirm('Are you sure you want to clear your cart?');

    this.cartService.clearCart();
  }
}
