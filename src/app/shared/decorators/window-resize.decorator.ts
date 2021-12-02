import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function WindowEventListener(event: string): any {
  return function (_: any, __: any, descriptor: any) {
    console.log({ descriptor });

    const method = descriptor.value as Function;

    fromEvent(window, event)
      .pipe(debounceTime(2000))
      .subscribe((_) => {
        method();
      });
  };
}
