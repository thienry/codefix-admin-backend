import { validateSync } from "class-validator";
import { FieldsErrors, IValidatorFields } from "./validator-fields.interface";

/**
 * Abstract class representing a validator using the class-validator library.
 * @abstract
 * @typeparam T - The type of data to validate.
 */
export abstract class ClassValidatorFields<T> implements IValidatorFields<T> {
  validatedData: T = null
  errors: FieldsErrors = null

  /**
   * Validates the provided data.
   * @param data - The data to be validated.
   * @returns True if the data is valid, otherwise false.
   */
  validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      for(const error of errors) {
        const field = error.property
        this.errors[field] = Object.values(error.constraints)
      }
    } else {
      this.validatedData = data
    }

    return !errors.length
  }
}
