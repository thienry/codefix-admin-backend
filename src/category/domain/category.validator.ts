import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Category } from "./category.entity";
import { ClassValidatorFields } from "../../shared/domain/class-validator-fields";

/**
 * Represents rules for validating a category.
 */
export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsBoolean()
  @IsOptional()
  is_active: boolean

  @IsString()
  @IsOptional()
  description: string | null

  /**
   * Creates an instance of CategoryRules.
   * @param category - The category object containing properties to initialize.
   */
  constructor({ description, is_active, name }: Category) {
    Object.assign(this, { description, is_active, name })
  }
}

/**
 * Represents a validator for category entities.
 * @extends ClassValidatorFields
 * @typeparam CategoryRules - The type of rules used for validation.
 */
export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  /**
   * Validates a category entity.
   * @param entity - The category entity to validate.
   * @returns True if the entity is valid, otherwise false.
   */
  validate(entity: Category): boolean {
    return super.validate(new CategoryRules(entity))
  }
}

/**
 * Factory for creating category validators.
 */
export class CategoryValidatorFactory {
  /**
   * Creates a new instance of CategoryValidator.
   * @returns A new instance of CategoryValidator.
   */
  static create(): CategoryValidator {
    return new CategoryValidator()
  }
}
