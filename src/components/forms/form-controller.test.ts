import { createSignal } from 'solid-js';
import { describe, expect, test } from 'vitest';
import { FormController } from './form-controller';
import { RequiredValidator } from './validators/required';
import { ErrorContext, Validator } from './validators/validator';

describe('FormController', () => {
    describe('addControl', () => {
        test('should return form control context', () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);

            //act
            const defaultValue = '123';
            const result = controller.addControl(
                {
                    name: 'N',
                },
                defaultValue,
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );

            // assert
            expect(result).toBeDefined();
            expect(result.get).toBeDefined();
            expect(result.set).toBeDefined();
            expect(result.error).toBeDefined();
        });

        test('should return form control context with getter which return default value', () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);

            //act
            const defaultValue = '123';
            const result = controller.addControl(
                {
                    name: 'N',
                },
                defaultValue,
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );

            // assert
            expect(result.get()).toBe(defaultValue);
        });

        test('should return form control context with setter and getter for control value', () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);

            //act
            const controlContext = controller.addControl(
                {
                    name: 'N',
                },
                '',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            const newValue = 'abc';
            controlContext.set(newValue);
            const actual = controlContext.get();

            // assert
            expect(actual).toBe(newValue);
        });

        test('should return form control context with for error getter which returns "undefined" by default', () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);

            //act
            const controlContext = controller.addControl(
                {
                    name: 'N',
                },
                '',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            const actual = controlContext.error();

            // assert
            expect(actual).toBeUndefined();
        });
    });

    describe('process', () => {
        test('should return default values if there is no changes', async () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);
            controller.addControl(
                {
                    name: 'fieldA',
                },
                'fieldA',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            controller.addControl(
                {
                    name: 'fieldB',
                },
                'fieldB',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );

            //act
            const actual = await controller.process();

            // assert
            expect(actual).toEqual({
                fieldA: 'fieldA',
                fieldB: 'fieldB',
            });
        });

        test('should return values with changes', async () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);
            const fieldA = controller.addControl(
                {
                    name: 'fieldA',
                },
                'fieldA',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            fieldA.set('newFieldA');
            const fieldB = controller.addControl(
                {
                    name: 'fieldB',
                },
                'fieldB',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            fieldB.set('newFieldB');

            //act
            const actual = await controller.process();

            // assert
            expect(actual).toEqual({
                fieldA: 'newFieldA',
                fieldB: 'newFieldB',
            });
        });

        test('should return "undefined" if any field is not valid', async () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);
            const fieldA = controller.addControl(
                {
                    name: 'fieldA',
                },
                '',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            fieldA.set('newFieldA');
            const fieldB = controller.addControl(
                {
                    name: 'fieldB',
                },
                '',
                [
                    new RequiredValidator({
                        error: () => 'Error',
                    }),
                ],
            );
            fieldB.set('');

            //act
            const actual = await controller.process();

            // assert
            expect(actual).toBeUndefined();
        });

        test('should update field error with validation error if field value is not valid', async () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);
            const expectedError = 'TestError';
            const fieldA = controller.addControl(
                {
                    name: 'fieldA',
                },
                '',
                [
                    new RequiredValidator({
                        error: () => expectedError,
                    }),
                ],
            );
            fieldA.set('');

            //act
            await controller.process();
            const actual = fieldA.error();

            // assert
            expect(actual?.error()).toBe(expectedError);
        });

        test('should update field error with validation error from first validator if field value is not valid', async () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);
            const expectedError = 'TestError';

            class TestValidator implements Validator {
                constructor(private readonly errorText: string) {}
                get category(): string {
                    return 'test';
                }
                validate(_v: unknown): Promise<ErrorContext | undefined> {
                    return Promise.resolve({
                        error: () => this.errorText,
                    });
                }
            }

            const fieldA = controller.addControl(
                {
                    name: 'fieldA',
                },
                '',
                [
                    new RequiredValidator({
                        error: () => expectedError,
                    }),
                    new TestValidator('SomeUnexpectedError1'),
                    new TestValidator('SomeUnexpectedError2'),
                ],
            );
            fieldA.set('');

            //act
            await controller.process();
            const actual = fieldA.error();

            // assert
            expect(actual?.error()).toBe(expectedError);
        });

        test('should apply several validators update field error with validation error from first validator if field value is not valid', async () => {
            // arrange
            const [error, setError] = createSignal(false);
            const controller = new FormController([error, setError]);
            const expectedError = 'TestError';

            class TestValidator implements Validator {
                constructor(
                    private isValid: boolean,
                    private readonly errorText: string,
                ) {}
                get category(): string {
                    return 'test';
                }
                validate(_v: unknown): Promise<ErrorContext | undefined> {
                    if (this.isValid) {
                        return Promise.resolve(undefined);
                    }
                    return Promise.resolve({
                        error: () => this.errorText,
                    });
                }
            }

            const fieldA = controller.addControl(
                {
                    name: 'fieldA',
                },
                '',
                [
                    new TestValidator(true, 'SomeUnexpectedError1'),
                    new TestValidator(true, 'SomeUnexpectedError2'),
                    new TestValidator(false, expectedError),
                ],
            );
            fieldA.set('');

            //act
            await controller.process();
            const actual = fieldA.error();

            // assert
            expect(actual?.error()).toBe(expectedError);
        });
    });
});
