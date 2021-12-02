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

const IMPORTED_MATERIAL_MOUDLES = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];

@NgModule({
  declarations: [PersonListComponent, AddPersonFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    IMPORTED_MATERIAL_MOUDLES,
  ],
})
export class PersonModule {}
