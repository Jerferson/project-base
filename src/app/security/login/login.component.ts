import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logged = false;
  loginEmail = false;
  labelLoged = 'Faça login com...';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login() {
    this.labelLoged = 'Usuário Logado';
    this.logged = true;
  }

  logout() {
    this.labelLoged = 'Faça login com...';
    this.loginEmail = false;
    this.logged = false;
  }
}
