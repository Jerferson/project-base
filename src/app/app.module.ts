import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginService } from './security/login-service/login.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyCYxoKyzPBqt7bE426NmBf6srSBRAnbtlQ',
  authDomain: 'projeto-base-5998a.firebaseapp.com',
  databaseURL: 'https://projeto-base-5998a.firebaseio.com',
  // projectId: "projeto-base-5998a",
  // storageBucket: "",
  messagingSenderId: '998296178904',
  // appId: "1:998296178904:web:c4aa014f3a902b5be847ad"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
