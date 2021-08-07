export function instanceOf<T>(object: any, key: string): object is T {
  return key in object;
}
