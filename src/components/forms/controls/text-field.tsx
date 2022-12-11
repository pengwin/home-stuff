import { useI18n } from '@solid-primitives/i18n';
import { createMemo, Show } from 'solid-js';
import { FormContext } from '../Form';

interface TextFieldIntProps {
    label: string;
    name: string;
    placeholder: string;
    value?: string;
    password?: boolean;
    required?: boolean;
    errorText?: string;
    valid?: boolean;
    autocomplete?: boolean;
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

interface TextFieldProps {
    label: string;
    name: string;
    placeholder: string;
    password?: boolean;
    required?: boolean;
    context: FormContext;
}

export default function TextField(props: TextFieldProps) {
    // eslint-disable-next-line solid/reactivity
    const [[get, set], error] = props.context.setField(
        // eslint-disable-next-line solid/reactivity
        props.name,
        '',
        // eslint-disable-next-line solid/reactivity
        props.required,
    );

    return (
        <TextFieldInt
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            password={props.password}
            required={props.required}
            value={get()}
            onChange={(s) => set(s)}
            errorText={error()}
        />
    );
}
