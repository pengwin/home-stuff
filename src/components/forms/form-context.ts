import { Accessor, Setter } from 'solid-js';
import type { FormControlParams } from './controls/form-control-params';
import type { Validator, ErrorContext } from './validators/validator';

export interface FormControlContext<T> {
    get: Accessor<T>;
    set: Setter<T>;
    error: Accessor<ErrorContext | undefined>;
}

export interface FormContext {
    addControl<T>(
        props: FormControlParams,
        defaultVal: T,
        validators: ReadonlyArray<Validator>,
    ): FormControlContext<T>;

    get formError(): Accessor<boolean>;
}
