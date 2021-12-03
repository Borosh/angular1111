import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { TableComponent } from './components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormDialogComponent } from './components/form-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { InlineMenuComponent } from './components/inline-menu/inline-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemsPipe } from './pipes/menu-items.pipe';

const COMPONENTS = [
  PaginableTableComponent,
  TableComponent,
  ButtonComponent,
  LoadingIndicatorComponent,
  FormDialogComponent,
  InlineMenuComponent,
];

const IMPORTED_MATERIAL_MOUDLES = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
];

const PIPES = [MenuItemsPipe];

@NgModule({
  imports: [
    IMPORTED_MATERIAL_MOUDLES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [COMPONENTS, PIPES],
  exports: [COMPONENTS, PIPES],
})
export class SharedModule {}
