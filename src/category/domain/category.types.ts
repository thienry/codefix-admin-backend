import { UUID } from "../../shared/domain/value-objects/uuid.vo";

/**
 * Represents the properties of a category.
 * @interface CategoryProps
 */
export interface CategoryProps {
  /**
   * The name of the category.
   * @type {string}
   */
  name: string;
  /**
   * The creation date of the category.
   * @type {Date}
   * @optional
   */
  created_at?: Date;
  /**
   * The UUID of the category.
   * @type {UUID}
   * @optional
   */
  category_id?: UUID;
  /**
   * Indicates whether the category is active.
   * @type {boolean}
   * @optional
   */
  is_active?: boolean;
  /**
   * The description of the category.
   * @type {string | null}
   * @optional
   */
  description?: string | null;
}

/**
 * Represents the command to create a category.
 * @interface CategoryCreateCommand
 */
export interface CategoryCreateCommand {
  /**
   * The name of the category to be created.
   * @type {string}
   */
  name: string;
  /**
   * Indicates whether the category to be created is active.
   * @type {boolean}
   * @optional
   */
  is_active?: boolean;
  /**
   * The description of the category to be created.
   * @type {string | null}
   * @optional
   */
  description?: string | null;
}