import { FieldsErrors } from "./src/shared/domain/validator-fields.interface";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
