import { useI18n } from '@solid-primitives/i18n';
import { Accessor, createMemo, Show } from 'solid-js';
import { RequiredValidator } from '../validators/required';
import { ErrorContext, Validator } from '../validators/validator';
import { FormControlProps } from './form-control-props';

interface TextFieldIntProps {
    label: string;
    name: string;
    placeholder: string;
    value?: string;
    password?: boolean;
    required?: boolean | undefined;
    errorText?: string;
    valid?: boolean;
    autocomplete?: boolean;
    testId?: string;
    onChange?: (val: string) => void;
}

function TextFieldInt(props: TextFieldIntProps) {
    const [t] = useI18n();
    const inputType = createMemo(() => (props.password ? 'password' : 'text'));
    const hasError = createMemo(() => !!props.errorText);
    const onInput = (e: InputEvent) => {
        const inputField = e.target as HTMLInputElement;
        if (props.onChange) {
            props.onChange(inputField.value);
        }
    };
    const autocomplete = createMemo(() =>
        props.autocomplete ? props.name : 'off',
    );

    return (
        <div class="form-control w-full max-w-xs">
            <label class="label">
                <span class="label-text">{props.label}</span>
                <Show when={props.required}>
                    <span class="label-text-alt text-base-300">
                        {t('components.forms.required')}
                    </span>
                </Show>
            </label>
            <input
                data-testid={props.testId}
                name={props.name}
                type={inputType()}
                placeholder={props.placeholder}
                class="input-bordered input input-sm w-full max-w-xs"
                classList={{
                    'input-success': props.valid,
                    'input-error': hasError(),
                    'text-error': hasError(),
                }}
                value={props.value}
                onInput={onInput}
                autocomplete={autocomplete()}
            />
            <label class="label">
                <Show when={hasError}>
                    <span class="label-text-alt text-error">
                        {props.errorText}
                    </span>
                </Show>
            </label>
        </div>
    );
}

interface TextFieldProps extends FormControlProps {
    password?: boolean;
    placeholder: string;
    required?: boolean | ErrorContext;
}

export default function TextField(props: TextFieldProps) {
    const [t] = useI18n();

    const defaultErrorText = createMemo(() => {
        const label = props.label;
        return t('components.forms.fieldRequired', { field: label });
    });

    const unwrappedErrorContext: Accessor<ErrorContext | undefined> =
        createMemo(() => {
            const required = props.required;
            if (!required) {
                return;
            }

            if (typeof required !== 'boolean') {
                return required;
            }

            if (!required) {
                return;
            }

            return {
                error: defaultErrorText,
            };
        });

    const ctx = createMemo(() => {
        const validators: Array<Validator> = [];
        const errorContext = unwrappedErrorContext();
        if (errorContext) {
            const validator = new RequiredValidator(errorContext);
            validators.push(validator);
        }
        return props.context.addControl(props, '', validators);
    });

    const errorText = createMemo(() => {
        const context = ctx();
        return context.error()?.error();
    });

    const requiredAttr = createMemo(() => !!unwrappedErrorContext());

    const onChange = s => ctx().set(s);

    return (
        <TextFieldInt
            testId={props.testId}
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            password={props.password}
            required={requiredAttr()}
            value={ctx().get()}
            onChange={onChange}
            errorText={errorText()}
        />
    );
}
