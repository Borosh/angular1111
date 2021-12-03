export function Log(): any {
  return function (_: any, key: string, descriptor: any) {
    const method = descriptor.value as Function;
    descriptor.value = function (...args: any[]) {
      console.log({ methodName: key, args });
      const result = method.apply(this, args);
      console.log({ method: key, result });
      return result;
    };

    return descriptor;
  };
}
