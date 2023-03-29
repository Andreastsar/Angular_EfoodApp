import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent {
  @Input()
  order!: Order;
}
