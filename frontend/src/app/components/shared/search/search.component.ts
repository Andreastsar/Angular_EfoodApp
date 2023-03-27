import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.searchForm.valid) return;

    const productTerm = this.searchForm.get('searchTerm').value;

    if (productTerm) {
      this.router.navigate(['home/search/', productTerm]);
    } else {
      return;
    }

    this.searchForm.reset();
  }

  onReset() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {}
}
