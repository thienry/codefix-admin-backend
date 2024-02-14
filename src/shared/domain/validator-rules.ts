import { ValidationError } from './validation-error'

/**
 * Represents a validator rule set for validating values against specific criteria.
 */
export class ValidatorRules {
  /**
   * Constructs a new instance of ValidatorRules.
   * @param value - The value to be validated.
   * @param property - The name of the property being validated.
   */
  private constructor(
    private value: any,
    private property: string,
  ) {}

  /**
   * Creates a new instance of ValidatorRules with the provided value and property name.
   * @param value - The value to be validated.
   * @param property - The name of the property being validated.
   * @returns A new instance of ValidatorRules.
   */
  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  /**
   * Validates that the value is not null, undefined, or an empty string.
   * @returns An instance of ValidatorRules.
   * @throws {ValidationError} Thrown if the value is null, undefined, or an empty string.
   */
  required(): Omit<this, 'required'> {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationError(`The ${this.property} is required`);
    }
    return this;
  }

  /**
   * Validates that the value is a string.
   * @returns An instance of ValidatorRules.
   * @throws {ValidationError} Thrown if the value is not a string.
   */
  string(): Omit<this, 'string'> {
    if (!isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidationError(`The ${this.property} must be a string`);
    }
    return this;
  }

  /**
   * Validates that the length of the value does not exceed the specified maximum length.
   * @param max - The maximum length allowed.
   * @returns An instance of ValidatorRules.
   * @throws {ValidationError} Thrown if the length of the value exceeds the maximum length.
   */
  maxLength(max: number): Omit<this, 'maxLength'> {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(
        `The ${this.property} must be less or equal than ${max} characters`,
      );
    }
    return this;
  }

  /**
   * Validates that the value is a boolean.
   * @returns An instance of ValidatorRules.
   * @throws {ValidationError} Thrown if the value is not a boolean.
   */
  boolean(): Omit<this, 'boolean'> {
    if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidationError(`The ${this.property} must be a boolean`);
    }
    return this;
  }
}

/**
 * Checks if the provided value is undefined or null.
 * @param value - The value to be checked.
 * @returns True if the value is undefined or null, otherwise false.
 */
export function isEmpty(value: any): boolean {
  return value === undefined || value === null;
}

export default ValidatorRules;
