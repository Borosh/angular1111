import { startCase } from 'lodash';
import { ColDef } from '../components/table/table.component';

export function TableColumnsProperty(...columns: (ColDef | string)[]) {
  return function (target: any, key: any) {
    Object.defineProperty(target, key, {
      get: () =>
        columns.map((column) => {
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
        }),
    });
  };
}
