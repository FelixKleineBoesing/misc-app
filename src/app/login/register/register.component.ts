import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roleKeys: string[];

  constructor() { 
    this.roleKeys = Object.keys(Role).filter(k => !isNaN(Number(k)));
  }

  ngOnInit(): void {
  }

}
