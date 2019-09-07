import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { LoginService } from '../login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  loginForm: FormGroup;
  logged = false;
  loginWithEmail = false;
  labelLoged = 'Faça login com...';

  constructor(private fb: FormBuilder, public loginService: LoginService) {
    this.user = this.loginService.getUser();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });

    // Verifica se o usuário está logado
    this.loginService.isLogged().then((res) => {
      if (res) {
        this.login();
      }
    });
  }

  loginFacebook() {
    this.loginService.loginFacebook();
    this.login();
  }

  loginGoogle() {
    this.loginService.loginGoogle();
    this.login();
  }

  loginEmail() {
    this.loginService.loginEmail(this.loginForm.value.email, this.loginForm.value.password);
    this.login();
  }

  login() {
    this.labelLoged = 'Usuário Logado';
    this.logged = true;
  }

  logout() {
    this.loginService.logout();
    this.labelLoged = 'Faça login com...';
    this.loginWithEmail = false;
    this.logged = false;
  }
}
