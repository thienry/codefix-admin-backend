import { ValueObject } from "./value-object";

/**
 * Abstract class representing an entity.
 * @abstract
 */
export abstract class Entity {
  /**
   * Abstract getter method for retrieving the entity ID.
   * @abstract
   * @returns The entity ID.
   */
  abstract get entity_id(): ValueObject;

  /**
   * Abstract method for converting the entity to JSON format.
   * @abstract
   * @returns The entity represented as a JSON object.
   */
  abstract toJSON(): Object;
}