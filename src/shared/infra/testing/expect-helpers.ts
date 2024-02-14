import { ClassValidatorFields } from "../../domain/class-validator-fields";
import { EntityValidationError } from "../../domain/validation-error";
import { FieldsErrors } from "../../domain/validator-fields.interface";

/**
 *
 * Represents the expected input for custom assertion functions.
 */
type Expected =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => any);

/**
 * Represents the structure of a custom assertion result.
 */
type CustomAssert = { pass: boolean; message: () => string }

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors): CustomAssert {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (err) {
        const error = err as EntityValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);
      if (validated) return isValid();
      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

/**
 * Asserts that the received validation errors contain the expected error messages.
 * @param expected - The expected validation errors.
 * @param received - The received validation errors.
 * @returns An object indicating whether the assertion passed or failed.
 */
function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
 ): CustomAssert {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected)
  const notMatchReturn = {
    pass: false,
    message: () =>
      `The validation errors not contains ${JSON.stringify(
        received
      )}. Current ${JSON.stringify(expected)}`,
  };

  return isMatch ? isValid() : notMatchReturn;
}

/**
 * Returns an object indicating that the assertion passed.
 * @returns An object indicating the success of the assertion.
 */
function isValid(): CustomAssert {
  return { pass: true, message: () => "" };
}
