/**
 * Represents validation errors for fields.
 */
export type FieldsErrors = { [field: string]: string[] }

/**
 * Represents a generic interface for validator fields.
 * @typeparam T - The type of data being validated.
 */
export interface IValidatorFields<T> {
  /**
   * The validation errors.
   */
  errors: FieldsErrors | null
  /**
   * Validates the provided data.
   * @param data - The data to be validated.
   * @returns True if the data is valid, otherwise false.
   */
  validate(data: any): boolean
  /**
   * The validated data.
   */
  validatedData: T | null
}
