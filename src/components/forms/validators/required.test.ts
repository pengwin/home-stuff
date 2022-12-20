import { describe, expect, test } from 'vitest';

import { RequiredValidator } from './required';
import { ErrorContext } from './validator';

const errContext: ErrorContext = {
    error() {
        return 'err';
    },
};

describe('RequiredValidator', () => {
    describe('validate method', () => {
        test.each([[''], [false], [null], [undefined]])(
            'should return error context for "%s"',
            async value => {
                // arrange
                const validator = new RequiredValidator(errContext);

                //act
                const result = await validator.validate(value);

                // assert
                expect(result).toBe(errContext);
            },
        );

        test.each([['test'], [true], [{ a: 1 }], [10]])(
            'should return "undefined" for "%s"',
            async value => {
                // arrange
                const validator = new RequiredValidator(errContext);

                //act
                const result = await validator.validate(value);

                // assert
                expect(result).toBeUndefined();
            },
        );
    });
});
