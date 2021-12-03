import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';
import { AddPersonFormComponent } from './components/add-person-form/add-person-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { PersonDetailsComponent } from './containers/person-details/person-details.component';
import { PersonStoreModule } from '@shared/store/person-store/person-store.module';

const IMPORTED_MATERIAL_MOUDLES = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    PersonListComponent,
    AddPersonFormComponent,
    PersonTableComponent,
    PersonDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    IMPORTED_MATERIAL_MOUDLES,
    PersonStoreModule,
  ],
})
export class PersonModule {}
