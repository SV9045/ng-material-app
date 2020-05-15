import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list-item',
  templateUrl: './sidenav-list-item.component.html',
  styleUrls: ['./sidenav-list-item.component.css']
})
export class SidenavListItemComponent implements OnInit, OnDestroy {

  @Output() closeLink: EventEmitter<any> = new EventEmitter<void>();
  isLoggedIn: boolean = false;
  authSubscribe: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscribe = this.authService.authChange.subscribe(
      (authStatus) => { this.isLoggedIn = authStatus } )
  }
  
  onClose() {
    this.closeLink.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
  }

}
