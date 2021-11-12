import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonGuard } from './guards/person.guard';

const routes: Routes = [
  {
    path: 'persons/:id',
    component: PersonListComponent,
    children: [
      {
        path: 'skywalker',
        canActivate: [],
      },
    ],
    canActivate: [PersonGuard],
    canActivateChild: [PersonGuard],
  },
  {
    path: 'persons/:id',
    component: PersonListComponent,
    canActivate: [PersonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
