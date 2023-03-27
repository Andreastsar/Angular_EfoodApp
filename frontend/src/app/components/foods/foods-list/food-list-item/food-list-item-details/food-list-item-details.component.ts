import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Food } from 'src/app/shared/models/food.model';

@Component({
  selector: 'app-food-list-item-details',
  templateUrl: './food-list-item-details.component.html',
  styleUrls: ['./food-list-item-details.component.css'],
})
export class FoodListItemDetailsComponent implements OnInit, OnDestroy {
  foodItem: Food;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      if (data['food']) {
        this.foodItem = data['food'];
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  addToCart(foodItem: Food) {
    this.cartService.addFoodItemToCart(foodItem);

    this.toastrService.success('Added to cart!', foodItem.name, {
      timeOut: 700,
      positionClass: 'toast-bottom-right',
    });

    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {}
}
