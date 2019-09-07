import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

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

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    this.login();
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.login();
  }

  loginEmail(email: string, password: string) {
    console.log(email + ' ---------- ' + password);
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch((err: any) => {
      console.log('error ------ ' + err);
    });
    this.login();
  }


  login() {
    this.labelLoged = 'Usuário Logado';
    this.logged = true;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.labelLoged = 'Faça login com...';
    this.loginWithEmail = false;
    this.logged = false;
  }
}
