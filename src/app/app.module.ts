import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { MainComponent } from './containers/main/main.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TableComponent,
    PaginableTableComponent,
    LoadingIndicatorComponent,
    PersonListComponent,
    MainComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
