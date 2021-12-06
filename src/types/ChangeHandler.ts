export interface ChangeHandler<T> {
  (changed: T): void
}

export interface SimpleHandler {
  (): void
 }

