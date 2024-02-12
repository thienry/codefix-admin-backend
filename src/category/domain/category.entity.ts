import { UUID } from "../../shared/domain/value-objects/uuid.vo"
import { CategoryCreateCommand, CategoryProps } from "./category.types"

/**
 * Represents a category.
 */
export class Category {
  name: string
  created_at: Date
  category_id: UUID
  is_active: boolean
  description: string | null

  /**
   * Creates an instance of Category.
   * @param {CategoryProps} props - The properties of the category.
   */
  constructor(props: CategoryProps) {
    this.category_id = props.category_id ?? new UUID();
    this.name = props.name;
    this.is_active = props.is_active ?? true;
    this.description = props.description ?? null;
    this.created_at = props.created_at ?? new Date();
  }

  /**
   * Creates a category with the given properties.
   * @param {CategoryCreateCommand} props - The properties to create the category.
   * @returns {Category} The created category instance.
   */
  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
  }

  /**
   * Changes the name of the category.
   * @param {string} name - The new name for the category.
   */
  changeName(name: string): void {
    this.name = name;
  }

  /**
   * Changes the description of the category.
   * @param {string} description - The new description for the category.
   */
  changeDescription(description: string): void {
    this.description = description;
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
   * @returns {Object} The category data as a JSON object.
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