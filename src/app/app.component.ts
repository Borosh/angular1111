import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  persons = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    },
    {
      name: 'Luke Skywalker1',
      height: '172',
      mass: '77',
      gender: 'male',
    },
    {
      name: 'Luke Skywalker2',
      height: '172',
      mass: '77',
      gender: 'male',
    },
  ];
}
