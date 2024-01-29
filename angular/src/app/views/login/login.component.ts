import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginMessage: string | null | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: response => {
        if (response.message === "Logged in successfully") {
          console.log("Login successful");
          this.authService.authenticated = true;
          this.router.navigate(["books"]);
        } else {
          console.log("Login failed");
        }
        this.loginMessage = response.message;
      }, error: error => {console.log(error)}
      });
  }
}
