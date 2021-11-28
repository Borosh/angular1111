import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './containers/person-details/person-details.component';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonGuard } from './guards/person.guard';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
    canActivate: [PersonGuard],
  },
  {
    path: ':id',
    component: PersonDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
