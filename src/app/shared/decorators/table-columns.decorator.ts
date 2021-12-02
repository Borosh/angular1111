import { Type } from '@angular/core';
import { startCase } from 'lodash';

import { ColDef } from '../components/table/table.component';

export function tableColumns(...columns: (ColDef | string)[]) {
  return function <T extends Type<any>>(myClass: T) {
    return class extends myClass {
      tableColumns: ColDef[] = columns.map((column) => {
        const header: ColDef =
          typeof column === 'string'
            ? {
                key: column,
                header: startCase(column),
              }
            : {
                key: column.key,
                header: column.header ?? startCase(column.key),
              };
        return header;
      });
    };
  };
}
