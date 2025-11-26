export type ApiErrorPath = readonly PropertyKey[];
export type ApiErrorType = {
  path?: ApiErrorPath;
  message: string;
};

export default class ApiError {
  private readonly errors: ApiErrorType[];

  constructor(errors: ApiErrorType[] = []) {
    this.errors = [...errors]; // ensures internal immutability
  }

  /** Add a single error (chainable) */
  addError(error: ApiErrorType): this {
    this.errors.push(error);
    return this;
  }

  /** Add multiple errors at once */
  addErrors(errors: ApiErrorType[]): this {
    this.errors.push(...errors);
    return this;
  }

  /** Retrieve all errors */
  getErrors(): readonly ApiErrorType[] {
    return this.errors;
  }

  /** Count errors */
  count(): number {
    return this.errors.length;
  }

  /** Return true if any errors exist */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /** Get first error (useful for quick returns) */
  first(): ApiErrorType | undefined {
    return this.errors[0];
  }

  /** Convert error paths into readable strings */
  flattenPaths(): string[] {
    return this.errors.map((err) => (err.path ? err.path.join(".") : "(root)"));
  }

  /** JSON output */
  toJSON() {
    return { errors: this.errors };
  }
}
