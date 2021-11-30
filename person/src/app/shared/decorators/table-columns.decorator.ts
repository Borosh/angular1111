import { Type } from '@angular/core';
import { startCase } from 'lodash';
import { ColDef } from '../components/table/table.component';

export function tableColumns(...columns: (string | ColDef)[]) {
  return function <T extends Type<any>>(myClass: T) {
    return class extends myClass {
      tableColumns: ColDef[] = columns.map((col) => {
        const header: ColDef =
          typeof col === 'string'
            ? {
                key: col,
                header: startCase(col),
                type: 'text',
              }
            : {
                key: col.key,
                header: col.header ?? startCase(col.key),
                type: col.type ?? 'text',
              };
        return header;
      });
    };
  };
}
