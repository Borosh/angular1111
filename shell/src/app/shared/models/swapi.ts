export interface SwapiGet<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
