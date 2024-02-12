import isEqual from "lodash/isEqual";

/**
 * Abstract class representing a value object.
 * @abstract
 */
export abstract class ValueObject {
  /**
   * Checks if the given value object is equal to this value object.
   * @param {this} vo - The value object to compare.
   * @returns {boolean} True if the given value object is equal to this value object, otherwise false.
   */
  equals(vo: this): boolean {
    if (
      vo === null ||
      vo === undefined ||
      vo.constructor.name !== this.constructor.name
    ) {
      return false;
    }

    return isEqual(vo, this);
  }
}
