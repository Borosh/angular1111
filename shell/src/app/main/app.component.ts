import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  viewContainer!: ViewContainerRef;

  isSidenavOpened: boolean;

  constructor(
    private router: Router,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {
    window.addEventListener('fromPersonList', () => {
      console.log('GOTCHA');
    });
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  onMenuClick() {
    this.isSidenavOpened = !this.isSidenavOpened;
    if (!this.isSidenavOpened) {
      loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        remoteName: 'person',
        exposedModule: './ButtonComponent',
      })
        .then((m) => {
          return m.ButtonComponent;
        })
        .then((comp) => {
          const factory = this.resolver.resolveComponentFactory(comp);
          this.viewContainer.createComponent(factory, undefined, this.injector);
        });
    }
  }

  ngAfterViewInit() {}
}
