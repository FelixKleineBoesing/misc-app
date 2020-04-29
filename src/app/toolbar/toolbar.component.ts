import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
