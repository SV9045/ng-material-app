import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  authSubscribe: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscribe = this.authService.authChange.subscribe(
      (authStatus) => { this.isLoggedIn = authStatus });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
  }
}
