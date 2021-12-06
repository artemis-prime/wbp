export interface Parser<T> {
  (value: string): T | null
}