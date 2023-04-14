import { describe, expect, Nullable, test, afterEach, vi } from 'vitest';

import { render, fireEvent, waitFor } from '@solidjs/testing-library';

import TextField from './text-field';
import { Form } from '../Form';
import { ErrorContext } from '../validators/validator';

const localeDict = {
    en: {
        components: {
            forms: {
                required: 'Required',
            },
        },
    },
    ru: {
        components: {
            forms: {
                required: 'Обязательно',
            },
        },
    },
};

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
    const value = createI18nContext(localeDict, lang || 'en');
    return render(() => (
        <I18nContext.Provider value={value}>
            <Form
                testId={formId}
                onSubmit={
                    obSubmit
                        ? obSubmit
                        : () => {
                              /* empty */
                          }
                }
            >
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
        </I18nContext.Provider>
    ));
};

describe('<TextField />', () => {
    let componentUnmount: Nullable<() => void> = null;

    afterEach(() => {
        if (componentUnmount) {
            componentUnmount();
        }
    });

    describe('should render <input /> with', () => {
        test.each([['text'], ['TEXT']])('placeholder="%s"', placeholder => {
            const { getByPlaceholderText, unmount } = renderField({
                testId: 'text-field',
                label: 'Test Label',
                name: 'test',
                placeholder,
            });
            componentUnmount = unmount;
            const inputEl = getByPlaceholderText(
                placeholder,
            ) as HTMLInputElement;
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.type).toBe('text');
        });

        test('type="text" if password = false', () => {
            const testId = 'text-field';
            const { getByTestId, unmount } = renderField({
                testId,
                label: 'Test Label',
                name: 'test',
                placeholder: 'Test Text',
            });
            componentUnmount = unmount;
            const inputEl = getByTestId(testId) as HTMLInputElement;
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.type).toBe('text');
        });

        test.each([
            [localeDict.en.components.forms.required, 'en'],
            [localeDict.ru.components.forms.required, 'ru'],
        ])('required label with text "%s" if lang = %s', (label, locale) => {
            const testId = 'text-field';
            const { getByText, unmount } = renderField(
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
            componentUnmount = unmount;
            expect(getByText(label)).toBeInTheDocument();
        });

        test('type="password" if password = true', () => {
            const testId = 'text-field';
            const { getByTestId, unmount } = renderField({
                testId,
                label: 'Test Label',
                name: 'test',
                placeholder: 'Test Text',
                password: true,
            });
            componentUnmount = unmount;
            const inputEl = getByTestId(testId) as HTMLInputElement;
            expect(inputEl).toBeInTheDocument();
            expect(inputEl.type).toBe('password');
        });

        test.each([['text'], ['TEXT']])('label with text "%s"', label => {
            const { getByText, unmount } = renderField({
                testId: 'text-field',
                label,
                name: 'test',
                placeholder: '',
            });
            componentUnmount = unmount;
            expect(getByText(label)).toBeInTheDocument();
        });
    });

    describe('should interact with Form', () => {
        test('and update form values received on form submit if required = false', async () => {
            // arrange
            const onSubmit = vi.fn();
            const testId = 'text-field';
            const { getByTestId, unmount } = renderField(
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
            componentUnmount = unmount;

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
            const { getByTestId, unmount } = renderField(
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
            componentUnmount = unmount;

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
            const { getByTestId, unmount } = renderField(
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
            componentUnmount = unmount;

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
            const { getByTestId, unmount } = renderField(
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
            componentUnmount = unmount;

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
