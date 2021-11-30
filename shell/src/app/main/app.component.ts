import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidenavOpened: boolean;

    window.addEventListener('fromPersonList', () => {
      console.log('GOTCHA');
    });

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  onMenuClick() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
