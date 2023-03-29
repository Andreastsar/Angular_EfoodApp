import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FoodListItemDetailsComponent } from './components/foods/foods-list/food-list-item/food-list-item-details/food-list-item-details.component';
import { FoodItemResolver } from './components/foods/foods-list/food-list-item/food-list-item-details/food-list-item-details.resolver';
import { FoodListResolver } from './components/foods/foods-list/food-list.resolver';
import { FoodsComponent } from './components/foods/foods.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentResolver } from './components/payment/payment.resolver';
import { NotfoundComponent } from './components/shared/not-found-page/notfound/notfound.component';
import { SearchResultsComponent } from './components/shared/search-results/search-results.component';
import { SearchResultsResolver } from './components/shared/search-results/search-results.resolver';

const routes: Routes = [
  // Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { foods: FoodListResolver },
    children: [
      { path: '', component: FoodsComponent },
      {
        path: 'search/:productTerm',
        component: SearchResultsComponent,
        resolve: { foods: SearchResultsResolver },
      },
    ],
  },

  // Login
  { path: 'login', component: LoginComponent },

  // Products
  {
    path: 'products/:id',
    component: FoodListItemDetailsComponent,
    resolve: { food: FoodItemResolver },
  },

  // Cart
  { path: 'cart', component: CartComponent },

  // Checkout
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  // Payment
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    resolve: { order: PaymentResolver },
  },

  // Not found / wildcard
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
