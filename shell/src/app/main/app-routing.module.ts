import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainComponent } from './containers/main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'persons',
    /* loadChildren: () =>
      import('../person/person.module').then((m) => m.PersonModule), */
    loadChildren: () =>
      /*       import('person/PersonModule')
        .then((m) => m.PersonModule)
        .catch((err) => console.log({ err })), */
      loadRemoteModule({
        remoteEntry: `${environment.mfUrl}/remoteEntry.js`,
        remoteName: 'person',
        exposedModule: './PersonModule',
      }).then((m) => m.PersonModule),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
