import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidenavOpened: boolean;

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  onMenuClick() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
