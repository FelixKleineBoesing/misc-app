import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  sideNavWidth = 250;
  authenticated = true;
  constructor(
    private authService: AuthService) {
      this.authService.currentUser.subscribe(user => {
        if (!user) {
          this.authenticated = false;
        } else {
          this.authenticated = true;
        }
      });
     }

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
