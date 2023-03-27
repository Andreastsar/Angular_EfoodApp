import { Component, Input } from '@angular/core';
import { Food } from 'src/app/shared/models/food.model';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.css'],
})
export class FoodListItemComponent {
  @Input() food: Food;
}
