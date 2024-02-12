import { v4 as uuidV4, validate as uuidValidate } from "uuid" 

import { ValueObject } from "../value-object";

/**
 * Represents a universally unique identifier (UUID) value object.
 * @extends ValueObject
 */
export class UUID extends ValueObject {
  /**
   * The UUID value.
   * @type {string}
   * @readonly
   */
  readonly id: string

  /**
   * Creates an instance of UUID.
   * @param {string} [id] - The UUID string. If not provided, a new UUID will be generated.
   */
  constructor(id?: string) {
    super()
    this.id = id || uuidV4()
    this.validate()
  }

  /**
   * Validates the UUID.
   * @private
   * @throws {InvalidUUIDError} Throws an error if the UUID is not valid.
   */
  private validate(): void {
    const isValid = uuidValidate(this.id)
    if (!isValid) {
      throw new InvalidUUIDError()
    }
  }
}

/**
 * Represents an error indicating an invalid UUID.
 * @extends Error
 */
export class InvalidUUIDError extends Error {
  /**
   * Creates an instance of InvalidUUIDError.
   * @param {string} [message] - The error message.
   */
  constructor(message?: string) {
    super(message || 'ID must be a valid UUID')
    this.name = 'InvalidUUIDError'
  }
}
