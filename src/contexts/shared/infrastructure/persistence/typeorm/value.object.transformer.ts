/* eslint-disable */
import { NewableClass } from '../../../doman/newable.class'
import { ValueObject } from '../../../doman/value-objects/value.object'

export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value),
  }
}
