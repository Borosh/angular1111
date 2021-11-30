import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './containers/person-details/person-details.component';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonDetailGuard } from './guards/person-detail.guard';
import { PersonsGuard } from './guards/persons.guard';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
    canActivate: [PersonsGuard],
  },
  {
    path: ':id',
    component: PersonDetailsComponent,
    canActivate: [PersonDetailGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
