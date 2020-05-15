import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {}

  private user: User;
  authChange = new Subject<boolean>();

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.afterAuthChange();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.afterAuthChange();
  }

  logout() {
    this.user = null;
    //because user is no longer LoggedIn
    this.authChange.next(false);
    this.router.navigate(['/']); 
  }

  get currentUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }

  private afterAuthChange() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
