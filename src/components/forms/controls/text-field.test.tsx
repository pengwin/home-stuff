import { describe, expect, test, afterEach, vi } from 'vitest';
import { cleanup, render, fireEvent, waitFor } from '@solidjs/testing-library';
import '@testing-library/jest-dom';

import { LocaleProvider, locales, useI18n } from '~/locale';

import TextField from './text-field';
import { Form } from '../Form';
import { ErrorContext } from '../validators/validator';

const formId = 'test-form';

const renderField = (
    {
        name,
        label,
        placeholder,
        required,
        testId,
        password,
    }: {
        testId: string;
        name: string;
        label: string;
        placeholder: string;
        required?: boolean | ErrorContext;
        password?: boolean;
    },
    obSubmit?: () => void,
    lang?: string,
) => {
    const emptySubmit = () => {
        /* empty */
    };

    const InnerForm = () => {
        const [_, { setLocale }] = useI18n();
        setLocale(lang || 'en');
        return (
            <Form testId={formId} onSubmit={obSubmit ? obSubmit : emptySubmit}>
                {ctx => (
                    <TextField
                        testId={testId}
                        context={ctx}
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        password={password}
                    />
                )}
            </Form>
        );
    };

    return render(() => (
        <LocaleProvider>
            <InnerForm />
        </LocaleProvider>
    ));
};

describe('<TextField />', () => {
    afterEach(cleanup);

    describe('should render <input /> with', () => {
        test.each([['text'], ['TEXT']])('placeholder="%s"', placeholder => {
            const { getByPlaceholderText } = renderField({
                testId: 'text-field',
                label: 'Test Label',
                name: 'test',
                placeholder,
            });
            const inputEl = getByPlaceholderText(
                placeholder,
            ) as HTMLInputElement;
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.type).toBe('text');
        });

        test('type="text" if password = false', () => {
            const testId = 'text-field';
            const { getByTestId } = renderField({
                testId,
                label: 'Test Label',
                name: 'test',
                placeholder: 'Test Text',
            });

            const inputEl = getByTestId(testId) as HTMLInputElement;
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.type).toBe('text');
        });

        test.each([
            [locales.en.components.forms.required, 'en'],
            [locales.ru.components.forms.required, 'ru'],
        ])('required label with text "%s" if lang = %s', (label, locale) => {
            const testId = 'text-field';
            const { getByText } = renderField(
                {
                    testId,
                    label: 'Test Label',
                    name: 'test',
                    placeholder: 'Test Text',
                    required: true,
                },
                undefined,
                locale,
            );

            expect(getByText(label)).toBeInTheDocument();
        });

        test('type="password" if password = true', () => {
            const testId = 'text-field';
            const { getByTestId } = renderField({
                testId,
                label: 'Test Label',
                name: 'test',
                placeholder: 'Test Text',
                password: true,
            });

            const inputEl = getByTestId(testId) as HTMLInputElement;
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.type).toBe('password');
        });

        test.each([['text'], ['TEXT']])('label with text "%s"', label => {
            const { getByText } = renderField({
                testId: 'text-field',
                label,
                name: 'test',
                placeholder: '',
            });

            expect(getByText(label)).toBeInTheDocument();
        });
    });

    describe('should interact with Form', () => {
        test('and update form values received on form submit if required = false', async () => {
            // arrange
            const onSubmit = vi.fn();
            const testId = 'text-field';
            const { getByTestId } = renderField(
                {
                    testId,
                    label: 'Test Label',
                    name: 'test',
                    placeholder: 'Test Text',
                    password: true,
                    required: false,
                },
                onSubmit,
            );

            const testValue = '123';

            // act
            const inputEl = getByTestId(testId) as HTMLInputElement;
            inputEl.value = testValue;
            await fireEvent.input(inputEl);
            const formEl = getByTestId(formId) as HTMLFormElement;
            await fireEvent.submit(formEl);

            // assert
            expect(onSubmit).toHaveBeenCalledWith({ test: testValue });
        });

        test('and update form values received on form submit if required = true and value is valid', async () => {
            // arrange
            const onSubmit = vi.fn();
            const testId = 'text-field';
            const { getByTestId } = renderField(
                {
                    testId,
                    label: 'Test Label',
                    name: 'test',
                    placeholder: 'Test Text',
                    password: true,
                    required: true,
                },
                onSubmit,
            );

            const testValue = 'SomeTestValue';

            // act
            const inputEl = getByTestId(testId) as HTMLInputElement;
            inputEl.value = testValue;
            await fireEvent.input(inputEl);
            const formEl = getByTestId(formId) as HTMLFormElement;
            await fireEvent.submit(formEl);

            // assert
            await waitFor(() =>
                expect(onSubmit).toHaveBeenCalledWith({ test: testValue }),
            );
        });

        test('and not update form values received on form submit if required = true and value is empty', async () => {
            // arrange
            const onSubmit = vi.fn();
            const testId = 'text-field';
            const { getByTestId } = renderField(
                {
                    testId,
                    label: 'Test Label',
                    name: 'test',
                    placeholder: 'Test Text',
                    password: true,
                    required: true,
                },
                onSubmit,
            );

            // act
            const inputEl = getByTestId(testId) as HTMLInputElement;
            inputEl.value = '';
            await fireEvent.input(inputEl);
            const formEl = getByTestId(formId) as HTMLFormElement;
            await fireEvent.submit(formEl);

            // assert
            await waitFor(() => expect(onSubmit).toBeCalledTimes(0));
        });

        test('and should show error  on form submit if required = true and value is empty', async () => {
            // arrange
            const onSubmit = vi.fn();
            const testId = 'text-field';
            const { getByTestId } = renderField(
                {
                    testId,
                    label: 'Test Label',
                    name: 'test',
                    placeholder: 'Test Text',
                    password: true,
                    required: true,
                },
                onSubmit,
            );

            // act
            const inputEl = getByTestId(testId) as HTMLInputElement;
            inputEl.value = '';
            await fireEvent.input(inputEl);
            const formEl = getByTestId(formId) as HTMLFormElement;
            await fireEvent.submit(formEl);

            // assert
            await waitFor(() => expect(onSubmit).toBeCalledTimes(0));
        });
    });
});
