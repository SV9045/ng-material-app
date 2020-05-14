import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list-item',
  templateUrl: './sidenav-list-item.component.html',
  styleUrls: ['./sidenav-list-item.component.css']
})
export class SidenavListItemComponent implements OnInit {

  @Output() closeLink: EventEmitter<any> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }
  
  onClose() {
    this.closeLink.emit();
  }

}
