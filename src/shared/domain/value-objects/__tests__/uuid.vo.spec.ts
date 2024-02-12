import { UUID, InvalidUUIDError } from '../uuid.vo';

describe('UUID Unit Tests', () => {
  describe('constructor', () => {
    it('should generate a valid UUID if no ID is provided', () => {
      const uuid = new UUID();
      expect(uuid.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should use the provided ID if valid', () => {
      const id = 'eb530b69-8ad3-471e-be03-a433226ae647';
      const uuid = new UUID(id);
      expect(uuid.id).toBe(id);
    });

    it('should not throw error if UUID is valid', () => {
      const id = 'eb530b69-8ad3-471e-be03-a433226ae647';
      const uuid = new UUID(id);
      const validateSpy = jest.spyOn(UUID.prototype as any, 'validate')

      expect(() => (uuid as any).validate()).not.toThrow();
      expect(validateSpy).toHaveBeenCalled();
      validateSpy.mockRestore();
    });

    it('should throw InvalidUUIDError if the provided ID is invalid', () => {
      const id = 'invalid-uuid';
      const validateSpy = jest.spyOn(UUID.prototype as any, 'validate')
      expect(() => new UUID(id)).toThrow(InvalidUUIDError);
      expect(validateSpy).toHaveBeenCalled();
      validateSpy.mockRestore();
    });
  });
});

describe('InvalidUUIDError Unit Tests', () => {
  it('should have correct name and message', () => {
    const error = new InvalidUUIDError();
    expect(error.name).toBe('InvalidUUIDError');
    expect(error.message).toBe('ID must be a valid UUID');
  });

  it('should allow custom error message', () => {
    const customMessage = 'Custom error message';
    const error = new InvalidUUIDError(customMessage);
    expect(error.message).toBe(customMessage);
  });
});
