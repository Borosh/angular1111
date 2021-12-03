export function readonly(target: any, key: any) {
  Object.defineProperty(target, key, { writable: false });
}
