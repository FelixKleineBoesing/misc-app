import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'misc-app';
  opened = true;

  @ViewChild('sidenav') sidenav: MatSidenav;

  ngOnInit() {
    this.opened = window.innerWidth < 768 ? false : true;
    this.resize(window);
  }
 
  ngAfterViewInit() {
    this.sidenav.fixedTopGap = 55;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(event.target);
  }

  resize(window_) {
    this.opened = window_.innerWidth < 768 ? false : true;
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

}
