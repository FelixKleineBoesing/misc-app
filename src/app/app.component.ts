import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import Quill from 'quill';

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'misc-app';
  opened = true;
  // TODO Sidenav should collaps if no one hovers over and only shows icons otherwise
  @ViewChild('sidenav') sidenav: MatSidenav;

  ngOnInit() {
    this.opened = window.innerWidth < 768 ? false : true;
    this.resize(window);
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
