import { Entity } from "../../shared/domain/entity"
import { EntityValidationError } from "../../shared/domain/validation-error"
import { ValueObject } from "../../shared/domain/value-object"
import { UUID } from "../../shared/domain/value-objects/uuid.vo"
import { CategoryCreateCommand, CategoryProps } from "./category.types"
import { CategoryValidatorFactory } from "./category.validator"

/**
 * Represents a category.
 * @extends Entity
 */
export class Category extends Entity {
  name: string
  created_at: Date
  category_id: UUID
  is_active: boolean
  description: string | null

  /**
   * Creates an instance of Category.
   * @param props - The properties of the category.
   */
  constructor(props: CategoryProps) {
    super()

    this.category_id = props.category_id ?? new UUID();
    this.name = props.name;
    this.is_active = props.is_active ?? true;
    this.description = props.description ?? null;
    this.created_at = props.created_at ?? new Date();
  }

  /**
  * Getter method for retrieving the entity ID as a ValueObject.
  * @returns The entity ID represented as a ValueObject.
  */
  get entity_id(): ValueObject {
    return this.category_id;
  }

  /**
   * Creates a category with the given properties.
   * @param props - The properties to create the category.
   * @returns The created category instance.
   */
  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category)
    return category
  }

  /**
  * Validates a category entity using the CategoryValidator.
  * @param entity - The category entity to validate.
  */
  static validate(entity: Category): void{
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(entity)
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  /**
   * Changes the name of the category.
   * @param name - The new name for the category.
   */
  changeName(name: string): void {
    this.name = name;
    Category.validate(this)
  }

  /**
   * Changes the description of the category.
   * @param description - The new description for the category.
   */
  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this)
  }

  /**
   * Activates the category.
   */
  activate(): void {
    this.is_active = true;
  }

  /**
   * Deactivates the category.
   */
  deactivate(): void {
    this.is_active = false;
  }

  /**
   * Returns the category data as a JSON object.
   * @returns The category data as a JSON object.
   */
  toJSON(): Object {
    return {
      category_id: this.category_id.id,
      name: this.name,
      is_active: this.is_active,
      description: this.description,
      created_at: this.created_at,
    };
  }
}