import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { TableComponent } from './components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormDialogComponent } from './components/dialog/form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PortalModule } from '@angular/cdk/portal';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemsPipe } from './pipes/menu-items.pipe';
import { InlineMenuComponent } from './components/inline-menu';
import { SelectComponent } from './components/select/select.component';

const COMPONENTS = [
  PaginableTableComponent,
  TableComponent,
  ButtonComponent,
  LoadingIndicatorComponent,
  FormDialogComponent,
  SelectComponent,
];

const IMPORTED_MATERIAL_MOUDLES = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  PortalModule,
  MatIconModule,
  MatMenuModule,
];

const PIPES = [MenuItemsPipe];

@NgModule({
  imports: [
    IMPORTED_MATERIAL_MOUDLES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [COMPONENTS, PIPES, InlineMenuComponent],
  exports: [COMPONENTS, PIPES],
})
export class SharedModule {}
