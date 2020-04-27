import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  sideNavWidth = 250;
  authenticated = true;

  constructor() { }

  ngOnInit(): void {
    this.shrink();
  }

  expand() {
    this.sideNavWidth = 250;
  }

  shrink() {
    this.sideNavWidth = 80;
  }
}
