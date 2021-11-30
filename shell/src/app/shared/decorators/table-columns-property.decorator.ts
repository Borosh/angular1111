import { startCase } from 'lodash';
import { ColDef } from '../components/table/table.component';

export function TableColumnsProperty(...columns: (string | ColDef)[]) {
  return function (target: any, key: string, random?: any) {
    console.log({ target, key, random });
    Object.defineProperty(target, key, {
      configurable: false,
      get: () =>
        columns.map((col) => {
          const header: ColDef =
            typeof col === 'string'
              ? {
                  key: col,
                  header: startCase(col),
                }
              : {
                  key: col.key,
                  header: col.header ?? startCase(col.key),
                };
          return header;
        }),
    });
  };
}
