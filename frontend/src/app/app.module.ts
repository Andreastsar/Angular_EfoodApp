import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuDropdownDirective } from './components/header/menu-dropdown.directive';
import { HomeComponent } from './components/home/home.component';
import { FoodsComponent } from './components/foods/foods.component';
import { FoodsListComponent } from './components/foods/foods-list/foods-list.component';
import { FoodListItemComponent } from './components/foods/foods-list/food-list-item/food-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodListItemDetailsComponent } from './components/foods/foods-list/food-list-item/food-list-item-details/food-list-item-details.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './components/shared/not-found-page/notfound/notfound.component';
import { FoodItemResolver } from './components/foods/foods-list/food-list-item/food-list-item-details/food-list-item-details.resolver';
import { SearchComponent } from './components/shared/search/search.component';
import { FoodListResolver } from './components/foods/foods-list/food-list.resolver';
import { SearchResultsComponent } from './components/shared/search-results/search-results.component';
import { SearchResultsResolver } from './components/shared/search-results/search-results.resolver';
import { LoginComponent } from './components/auth/login/login.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { AuthGuard } from './components/auth/auth.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentResolver } from './components/payment/payment.resolver';
import { PaypalComponent } from './components/shared/paypal/paypal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuDropdownDirective,
    HomeComponent,
    FoodsComponent,
    FoodsListComponent,
    FoodListItemComponent,
    FoodListItemDetailsComponent,
    CartComponent,
    NotfoundComponent,
    SearchComponent,
    SearchResultsComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    CheckoutComponent,
    PaymentComponent,
    PaypalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      newestOnTop: true,
    }),
  ],
  providers: [
    FoodItemResolver,
    FoodListResolver,
    SearchResultsResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    PaymentResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
