export function ReadOnly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}
