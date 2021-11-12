import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { TableComponent } from './components/table/table.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [
    PaginableTableComponent,
    TableComponent,
    ButtonComponent,
    LoadingIndicatorComponent,
  ],
  exports: [
    PaginableTableComponent,
    TableComponent,
    ButtonComponent,
    LoadingIndicatorComponent,
  ],
})
export class SharedModule {}