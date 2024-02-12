import { ValueObject } from "../value-object";

describe('ValueObject Unit Tests', () => {
  class TestValueObject extends ValueObject {
    constructor(readonly value: string) {
      super()
    }
  }

  describe('equals unit tests', () => {
    it('should return true when comparing two equal value objects', () => {
      const obj1 = new TestValueObject('test');
      const obj2 = new TestValueObject('test');
      expect(obj1.equals(obj2)).toBeTruthy();
    });

    it('should return false when comparing with null', () => {
      const obj1 = new TestValueObject('test');
      expect(obj1.equals(null as any)).toBeFalsy();
    });

    it('should return false when comparing with undefined', () => {
      const obj1 = new TestValueObject('test');
      expect(obj1.equals(undefined as any)).toBeFalsy();
    });

    it('should return false when comparing with a different type', () => {
      const obj1 = new TestValueObject('test');
      expect(obj1.equals('test' as any)).toBeFalsy();
    });

    it('should return false when comparing with a different value object type', () => {
      class AnotherValueObject extends ValueObject {
        constructor(public value: string) {
          super();
        }
      }

      const obj1 = new TestValueObject('test');
      const obj2 = new AnotherValueObject('test');
      expect(obj1.equals(obj2)).toBeFalsy();
    });
  })
})
