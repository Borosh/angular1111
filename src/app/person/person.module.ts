import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PersonListComponent } from './containers/person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';

@NgModule({
  declarations: [PersonListComponent],
  imports: [CommonModule, SharedModule, PersonRoutingModule],
})
export class PersonModule {}
