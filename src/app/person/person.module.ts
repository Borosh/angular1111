import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';
import { AddPersonFormComponent } from './components/add-person-form/add-person-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const IMPORTED_MATERIAL_MOUDLES = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];

@NgModule({
  declarations: [PersonListComponent, AddPersonFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonRoutingModule,
    IMPORTED_MATERIAL_MOUDLES,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PersonModule {}
