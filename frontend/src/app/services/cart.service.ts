import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cart-item';
import { Food } from '../shared/models/food.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject = new BehaviorSubject<Cart>(this.cart);

  constructor() {}

  // Add new cart item
  addFoodItemToCart(foodItem: Food): void {
    // Check if the added item exists or not in cart
    let cartItem = this.cart.items.find((item) => item.food.id === foodItem.id);

    if (cartItem) return;

    this.cart.items.push(new CartItem(foodItem));

    // update local storage
    this.setCartToLocalStorage();
  }
  // --------------------------------------------------------------

  // Remove cart item by ID
  removeFoodItemFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);

    // update local storage
    this.setCartToLocalStorage();
  }
  // --------------------------------------------------------------

  // Update cart item quantity and price
  increaseQuantity(foodId: string): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if (!cartItem) return;

    // update quantity and price
    cartItem.quantity++;
    cartItem.price = cartItem.quantity * cartItem.food.price;

    // update local storage
    this.setCartToLocalStorage();
  }

  decreaseQuantity(foodId: string): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if (!cartItem) return;

    // update quantity and price
    if (cartItem.quantity <= 1) return;

    cartItem.quantity--;
    cartItem.price = cartItem.quantity * cartItem.food.price;

    // update local storage
    this.setCartToLocalStorage();
  }

  // --------------------------------------------------------------

  // Clear the cart
  clearCart() {
    this.cart = new Cart();

    // update local storage
    this.setCartToLocalStorage();
  }
  // --------------------------------------------------------------

  // Return the cart as observable
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  // --------------------------------------------------------------

  // Return the cart values
  getCart(): Cart {
    return this.cartSubject.value;
  }
  // --------------------------------------------------------------

  // Save Cart to local storage
  private setCartToLocalStorage(): void {
    // calculate the total price of the cart
    this.cart.totalPrice = this.cart.items.reduce(
      (acc, item) => acc + item.price,
      0
    );

    // calculate the total count of the cart
    this.cart.totalCount = this.cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const cartJSON = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJSON);

    // update the cartSubject
    this.cartSubject.next(this.cart);
  }
  // --------------------------------------------------------------

  // Get the cart from local storage
  private getCartFromLocalStorage(): Cart {
    let cartJSON = localStorage.getItem('Cart');

    return cartJSON ? JSON.parse(cartJSON) : new Cart();
  }
}
