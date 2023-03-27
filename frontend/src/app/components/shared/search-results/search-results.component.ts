import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Food } from 'src/app/shared/models/food.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  foods: Food[];
  originalFoods: Food[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.originalFoods = data['foods'];

      this.foods = this.originalFoods.filter((food) => {
        return food.name
          .toLowerCase()
          .includes(this.route.snapshot.params['productTerm'].toLowerCase());
      });
    });
  }
}
