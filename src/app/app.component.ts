import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-material-app';
  toggleNav: boolean = true;

  toggleSidebar() {
    this.toggleNav = !this.toggleNav;
  }
}
