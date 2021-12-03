import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('formContainer', { read: ViewContainerRef })
  formContainer: ViewContainerRef;
  
  isSidenavOpened: boolean;

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  onMenuClick() {
    this.isSidenavOpened = !this.isSidenavOpened;
    if (!this.isSidenavOpened) {
      loadRemoteModule({
        remoteEntry: `${environment.mfUrl}/remoteEntry.js`,
        remoteName: 'person',
        exposedModule: './ButtonComponent',
      })
        .then((m) => m.ButtonComponent)
        .then((componentClass) => {
          const factory =
            this.componentFactoryResolver.resolveComponentFactory(
              componentClass
            );
          this.formContainer.createComponent(factory);
        });
    }
  }
}
