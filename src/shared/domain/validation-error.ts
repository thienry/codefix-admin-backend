import { FieldsErrors } from "./validator-fields.interface";

/**
 * Represents a validation error.
 * @extends Error
 */
export class ValidationError extends Error {}

/**
 * Represents a validation error specific to entities.
 * @extends Error
 */
export class EntityValidationError extends Error {
  /**
   * Creates an instance of EntityValidationError.
   * @param - The validation error details.
   * @param - The error message.
   */
  constructor(public error: FieldsErrors, message = 'Validation Error') {
    super(message)
  }

  /**
   * Counts the number of validation errors.
   * @returns The number of validation errors.
   */
  count(): number {
    return Object.keys(this.error).length
  }
}
