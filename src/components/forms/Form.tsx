import { createMemo, createSignal, JSX, Signal } from 'solid-js';
import { FormContext } from './form-context';
import { FormController } from './form-controller';

import type { Validator, ErrorContext } from './validators/validator';

interface FormProps<U extends JSX.Element> {
    class?: string;
    testId?: string;
    onSubmit: (res: unknown) => void;
    children: (context: FormContext) => U;
}

export interface FieldDescription {
    value: Signal<unknown>;
    error: Signal<ErrorContext | undefined>;
    validators: ReadonlyArray<Validator>;
}

export function Form<U extends JSX.Element>(props: FormProps<U>) {
    const classValue = createMemo(() => props.class || '');
    const [error, setError] = createSignal<boolean>(false);

    const ctx = new FormController([error, setError]);

    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const result = await ctx.process();
        if (result) {
            props.onSubmit(result);
        }
    };

    return (
        <form
            data-testid={props.testId}
            class={classValue()}
            onSubmit={onSubmit}
        >
            {props.children(ctx)}
        </form>
    );
}
