import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<firebase.User>;
  authState: any = null;

  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }
  getUser(): Observable<firebase.User> {
    return this.user;
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async isLogged() {
    const user = await this.isLoggedIn();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch((err: any) => {
      console.log(`Erro ao executar login do usuário: ${email} -  ${err}`);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
