import { Category } from '../category.entity';
import { CategoryProps, CategoryCreateCommand } from '../category.types';
import { UUID } from '../../../shared/domain/value-objects/uuid.vo';

describe('Category', () => {
  const validProps: CategoryProps = {
    name: 'TestCategory',
    created_at: new Date(),
    category_id: new UUID(),
    is_active: true,
    description: 'Test description',
  };

  describe('constructor', () => {
    it('should initialize all properties with valid input', () => {
      const category = new Category(validProps);
      expect(category.name).toBe(validProps.name);
      expect(category.created_at).toBe(validProps.created_at);
      expect(category.category_id).toBe(validProps.category_id);
      expect(category.is_active).toBe(validProps.is_active);
      expect(category.description).toBe(validProps.description);
    });

    it('should use default values for missing optional properties', () => {
      const { description, ...propsWithoutName } = validProps;
      const category = new Category(propsWithoutName as any);
      expect(category.name).toBe('TestCategory');
      expect(category.is_active).toBe(true);
      expect(category.description).toBe(null);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUID);
    });
  });

  describe('create', () => {
    it('should create a new category instance with the given properties', () => {
      const createCommand: CategoryCreateCommand = {
        name: 'TestCategory',
        is_active: true,
        description: 'Test description',
      };
      const category = Category.create(createCommand);
      expect(category.name).toBe(createCommand.name);
      expect(category.is_active).toBe(createCommand.is_active);
      expect(category.description).toBe(createCommand.description);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.category_id).toBeInstanceOf(UUID);
    });
  });

  describe('category_id field', () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new UUID() }];

    test.each(arrange)('should be is %j', (props) => {
      const category = new Category(props as any);
      expect(category.category_id).toBeInstanceOf(UUID);
    });
  });

  describe('changeName', () => {
    it('should change the name of the category', () => {
      const category = new Category(validProps);
      const newName = 'NewTestCategory';
      category.changeName(newName);
      expect(category.name).toBe(newName);
    });
  });

  describe('changeDescription', () => {
    it('should change the description of the category', () => {
      const category = new Category({ name: 'Test Category' });
      const newDescription = 'New Description';
      category.changeDescription(newDescription);
      expect(category.description).toBe(newDescription);
    });
  });

  describe('activate', () => {
    it('should set the category as active', () => {
      const category = new Category({ name: 'Test Category', is_active: false });
      category.activate();
      expect(category.is_active).toBe(true);
    });
  });

  describe('deactivate', () => {
    it('should set the category as inactive', () => {
      const category = new Category({ name: 'Test Category', is_active: true });
      category.deactivate();
      expect(category.is_active).toBe(false);
    });
  });

  describe('toJSON', () => {
    it('should return the category properties as JSON object', () => {
      const props = {
        name: 'Test Category',
        created_at: new Date('2023-01-01'),
        category_id: new UUID(),
        is_active: true,
        description: 'This is a test category',
      };
      const category = new Category(props);
      const json = category.toJSON();
      expect(json).toEqual({
        name: props.name,
        created_at: props.created_at,
        category_id: props.category_id.id,
        is_active: props.is_active,
        description: props.description,
      });
    });
  });

});
