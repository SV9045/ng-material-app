import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {}

  isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  registerUser(authData: AuthData) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then((result) => {
      console.log(result);
      this.afterAuthChange();
    })
    .catch((error) => console.log(error));
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then((result) => {
      console.log(result);
      this.afterAuthChange();
    })
    .catch((error) => console.log(error));
  }

  logout() {
    //because user is no longer LoggedIn
    this.authChange.next(false);
    this.router.navigate(['/']);
    this.isAuthenticated = false;
  }

  get isAuth() {
    return !!this.isAuthenticated;
  }

  private afterAuthChange() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
