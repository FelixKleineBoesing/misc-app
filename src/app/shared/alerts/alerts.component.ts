import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
  }

  error(message: string, action: string = null, duration: number = null){
    this.openSnackBar(message, action, duration);
  }

  success(message: string, action: string = null, duration: number = null) {
    this.openSnackBar(message, action, duration);
  }

  openSnackBar(message: string, action: string = null, duration: number = null) {
    this.snackBar.open(message, action, {duration});
  }
}
