export interface Serializer<T> {
  (value: T): string
}