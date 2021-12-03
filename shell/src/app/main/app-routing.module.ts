import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      import('person/PersonModule')
        .then((m) => m.PersonModule)
        .catch((err) => console.log({ err })),
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
