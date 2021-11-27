import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export function WindowEventListener(event: string): any {
  return function (
    _: { [functionName: string]: Function },
    __: string,
    descriptor: any
  ) {
    const method = descriptor.value as Function;
    fromEvent(window, event)
      .pipe(distinctUntilChanged(), debounceTime(2000))
      .subscribe((_) => {
        method();
      });
  };
}
