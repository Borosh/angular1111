import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { TableComponent } from './components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const COMPONENTS = [
  PaginableTableComponent,
  TableComponent,
  ButtonComponent,
  LoadingIndicatorComponent,
];

const IMPORTED_MATERIAL_MOUDLES = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [IMPORTED_MATERIAL_MOUDLES, CommonModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
