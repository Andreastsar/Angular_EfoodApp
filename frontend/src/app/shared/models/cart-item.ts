import { Food } from './food.model';

export class CartItem {
  constructor(public food: Food) {}

  quantity = 1;
  price = this.food.price;
}
