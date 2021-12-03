import { Pipe, PipeTransform } from '@angular/core';
import { InlineMenuItem } from '@shared/components/inline-menu/inline-menu.component';

@Pipe({ name: 'menuItems' })
export class MenuItemsPipe implements PipeTransform {
  transform<T>(
    values: T[],
    actions: InlineMenuItem<T>[]
  ): (T & { actions: InlineMenuItem<T>[] })[] {
    return values.map((value) => ({ ...value, actions }));
  }
}
