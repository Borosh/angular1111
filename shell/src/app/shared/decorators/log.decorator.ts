export function Log(): any {
  return function (
    _: { [functionName: string]: Function },
    key: string,
    descriptor: any
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log({ methodName: key, args });
      const result = originalMethod.apply(this, args);
      console.log({ result });

      return result;
    };

    return descriptor;
  };
}
