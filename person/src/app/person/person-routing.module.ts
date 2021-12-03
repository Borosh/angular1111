import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './containers/person-details/person-details.component';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonDetailsGuard } from './guards/person-details.guard';
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
    canActivate: [PersonDetailsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
