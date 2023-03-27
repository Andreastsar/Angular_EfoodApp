import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode = false;
  loginForm: FormGroup;
  error: string;
  userRegistered: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialize the Sign Up / In Form
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.isLoading = false;
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm() {
    this.isLoading = true;

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const name = this.loginForm.get('name').value;
    const address = this.loginForm.get('address').value;

    // Login
    if (this.isLoginMode) {
      if (
        !this.loginForm.get('password').valid ||
        !this.loginForm.get('email').valid
      )
        return;

      this.authService
        .userLogin({ email: email, password: password })
        .subscribe(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/home']);
          }, 500);
        });
    }

    // Register
    if (!this.isLoginMode) {
      if (!this.loginForm.valid) return;

      this.authService
        .userRegister({
          name: name,
          email: email,
          password: password,
          address: address,
        })
        .subscribe(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/home']);
          }, 500);
        });
    }
  }
}
